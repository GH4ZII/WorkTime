// pages/skift.tsx
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { Layout } from '../components/Layout'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    CircularProgress,
    Grid,
    Divider,
    Tooltip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Badge
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    LocationOn as LocationIcon,
    Notes as NotesIcon,
    AccessTime as TimeIcon,
    CalendarToday as CalendarIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Today as TodayIcon,
    DateRange as DateRangeIcon,
    Event as EventIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Refresh as RefreshIcon,
    SmartToy as AiIcon
} from '@mui/icons-material';

interface Employee {
    id: string
    name: string
}

interface Shift {
    id: string
    userId: string
    startTime: string
    endTime: string
    location?: string
    notes?: string
    createdBy: string
    user?: Employee
}

interface ShiftPayload {
    id?: string
    userId: string
    date: string
    startTime: string
    endTime: string
    location?: string
    notes?: string
    createdBy: string
}

const SkiftPage: NextPage = () => {
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [employees, setEmployees] = useState<Employee[]>([])
    const [shifts, setShifts] = useState<Shift[]>([])
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [form, setForm] = useState<ShiftPayload>({
        userId: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        createdBy: 'admin',
    })

    const [editingShift, setEditingShift] = useState<Shift | null>(null)
    const [editForm, setEditForm] = useState<ShiftPayload>({
        id: '',
        userId: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        createdBy: 'admin',
    })

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    // ← Ny: AI Scheduler state
    const [showAiScheduler, setShowAiScheduler] = useState(false);
    const [aiGeneratedSchedule, setAiGeneratedSchedule] = useState<any>(null);
    const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    // ← Ny: Fravær state
    const [showAbsenceForm, setShowAbsenceForm] = useState(false);
    const [absenceForm, setAbsenceForm] = useState({
        userId: '',
        fromDate: '',
        toDate: '',
        type: 'SICK' as 'VACATION' | 'SICK' | 'OTHER',
        reason: '',
        shiftId: ''
    });
    const [absences, setAbsences] = useState<any[]>([]);

    // ← Ny: Ledige skift state
    const [showAvailableShiftForm, setShowAvailableShiftForm] = useState(false);
    const [availableShiftForm, setAvailableShiftForm] = useState({
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        createdBy: 'admin'
    });
    const [availableShifts, setAvailableShifts] = useState<any[]>([]);

    // Legg til ny state for ukesgenerering
    const [isGeneratingWeeklySchedule, setIsGeneratingWeeklySchedule] = useState(false);
    const [selectedWeekStart, setSelectedWeekStart] = useState(() => {
        // Start med mandag i inneværende uke
        const today = new Date();
        const dayOfWeek = today.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysToMonday);
        return monday;
    });

    // ← Ny: Hent AI-genererte skift
    const handleAiGenerateSchedule = async () => {
        setIsGeneratingSchedule(true);
        try {
            const response = await axios.post('http://localhost:3001/ai/generate-monthly-schedule', {
                month: selectedMonth.toISOString(),
            });
            
            if (response.data.success) {
                setAiGeneratedSchedule(response.data);
                // ← Viktig: Ikke overskriv eksisterende skift enda
        
                setShowAiScheduler(true); // ← Vis AI-delen
            } else {
                console.error('AI-generering feilet:', response.data.message);
                alert(`AI-generering feilet: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Feil ved AI-generering:', error);
            alert('Feil ved AI-generering. Sjekk konsollen for detaljer.');
        } finally {
            setIsGeneratingSchedule(false);
        }
    };

    // ← Ny: Godkjenn AI-plan
    const handleApproveAiSchedule = async () => {
        if (!aiGeneratedSchedule) return;
        
        try {
            const response = await axios.post('http://localhost:3001/ai/apply-schedule', {
                shifts: aiGeneratedSchedule.shifts,
                month: selectedMonth.toISOString().slice(0, 7),
                approved: true
            });
            
            if (response.data.success) {
                alert('AI-skiftplan godkjent og lagret!');
                setAiGeneratedSchedule(null);
                fetchShifts(); // ← Hent oppdaterte skift
            }
        } catch (error) {
            console.error('Feil ved godkjenning:', error);
            alert('Feil ved lagring av AI-skiftplan');
        }
    };

    // ← Ny: Forkast AI-plan
    const handleRejectAiSchedule = () => {
        setAiGeneratedSchedule(null);
        setShowAiScheduler(false);
        alert('AI-skiftplan forkastet.');
    };

    // Legg til ny funksjon for ukentlig AI-generering
    const handleAiGenerateWeeklySchedule = async () => {
        setIsGeneratingWeeklySchedule(true);
        try {
            const response = await axios.post('http://localhost:3001/ai/generate-weekly-schedule', {
                weekStart: selectedWeekStart.toISOString(),
            });
            
            if (response.data.success) {
                setAiGeneratedSchedule(response.data);
        
                setShowAiScheduler(true);
            } else {
                console.error('AI-ukesgenerering feilet:', response.data.message);
                alert(`AI-ukesgenerering feilet: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Feil ved AI-ukesgenerering:', error);
            alert('Feil ved AI-ukesgenerering. Sjekk konsollen for detaljer.');
        } finally {
            setIsGeneratingWeeklySchedule(false);
        }
    };

    // Legg til funksjon for å endre uke
    const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWeekStart = new Date(event.target.value);
        setSelectedWeekStart(newWeekStart);
    };

    // ← Ny: Måned velger
    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMonth = new Date(event.target.value);
        setSelectedMonth(newMonth);
    };

    // ← Sjekk om en ansatt har AI-skift på en dato
    const hasAiShiftOnDate = (employeeId: string, date: Date) => {
        if (!aiGeneratedSchedule || !aiGeneratedSchedule.shifts) return false
        
        const dateStr = date.toISOString().split('T')[0]
        return aiGeneratedSchedule.shifts.some((shift: any) => {
            return shift.employeeId === employeeId && shift.date === dateStr
        })
    }

    // ← getWeekDays funksjonen må være definert FØRST
    const getWeekDays = () => {
        const days = []
        
        // Sørg for at vi starter på mandag
        const startOfWeek = new Date(currentWeek)
        const dayOfWeek = startOfWeek.getDay() // 0 = søndag, 1 = mandag, etc.
        
        // Beregn hvor mange dager tilbake til mandag
        let daysToSubtract
        if (dayOfWeek === 0) { // Søndag
            daysToSubtract = 6
        } else {
            daysToSubtract = dayOfWeek - 1
        }
        
        // Gå tilbake til mandag
        startOfWeek.setDate(startOfWeek.getDate() - daysToSubtract)
        
        // Generer ukedager fra mandag til søndag
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek)
            day.setDate(startOfWeek.getDate() + i)
            
            // Sørg for at klokken er satt til 12:00 for å unngå timezone-problemer
            day.setHours(12, 0, 0, 0)
            
            days.push(day)
        }
        
        return days
    }

    const fetchAbsences = async () => {
        try {
            const res = await axios.get<any[]>('http://localhost:3001/time-off-requests', { withCredentials: true })
            setAbsences(res.data)
        } catch (err: any) {
            console.error('Feil ved henting av fravær:', err)
            // Ikke sett error state for fravær - det er ikke kritisk
        }
    }

    const fetchAvailableShifts = async () => {
        try {
            // Hent ledige skift fra samme endpoint som vanlige skift
            const res = await axios.get<any[]>('http://localhost:3001/shifts', { withCredentials: true })
            const available = res.data.filter((shift: any) => shift.isAvailableShift === true)
            setAvailableShifts(available)
        } catch (err: any) {
            console.error('Feil ved henting av ledige skift:', err)
        }
    }

    // ← NÅ kan du deklarere weekDays
    const weekDays = getWeekDays()

    useEffect(() => {
        fetchEmployees()
        fetchShifts()
        fetchAbsences()
        fetchAvailableShifts()
        
        // Sørg for at currentWeek starter på riktig uke
        const today = new Date()
        today.setHours(12, 0, 0, 0) // Sett til 12:00 for å unngå timezone-problemer
        setCurrentWeek(today)
    }, [])

    const fetchEmployees = async () => {
        try {
            setLoading(true)
            const res = await axios.get<Employee[]>('http://localhost:3001/users', { withCredentials: true })
            setEmployees(res.data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchShifts = async () => {
        try {
            const res = await axios.get<Shift[]>('http://localhost:3001/shifts', { withCredentials: true })
            setShifts(res.data)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Oppdaterer skjema-state når brukeren endrer input-felter
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    // Sender skjema-data til serveren når brukeren trykker "Lagre"
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Lag riktig ISO-8601 format med millisekunder og timezone
        const startDateTime = `${form.date}T${form.startTime}:00.000Z`
        const endDateTime = `${form.date}T${form.endTime}:00.000Z`
        
        const payload = {
            userId: form.userId,
            startTime: startDateTime,
            endTime: endDateTime,
            location: form.location,
            notes: form.notes,
            createdBy: form.createdBy,
        }
        
        try {
            await axios.post('http://localhost:3001/shifts', payload, { withCredentials: true })
            setForm({ userId: '', date: '', startTime: '', endTime: '', location: '', notes: '', createdBy: 'admin' })
            setShowForm(false)
            setSuccess('Skift opprettet!')
            fetchShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Rediger skift
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!editingShift) return

        // Lag riktig ISO-8601 format med millisekunder og timezone
        const startDateTime = `${editForm.date}T${editForm.startTime}:00.000Z`
        const endDateTime = `${editForm.date}T${editForm.endTime}:00.000Z`
        
        const payload = {
            userId: editForm.userId,
            startTime: startDateTime,
            endTime: endDateTime,
            location: editForm.location,
            notes: editForm.notes,
            createdBy: editForm.createdBy,
        }
        
        try {
            await axios.put(`http://localhost:3001/shifts/${editingShift.id}`, payload, { withCredentials: true })
            setShowEditForm(false)
            setEditingShift(null)
            setSuccess('Skift oppdatert!')
            fetchShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Slett skift
    const handleDelete = async (shiftId: string) => {
        if (!confirm('Er du sikker på at du vil slette dette skiftet?')) return
        
        try {
            await axios.delete(`http://localhost:3001/shifts/${shiftId}`, { withCredentials: true })
            setSuccess('Skift slettet!')
            fetchShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        }
    }

    // Start redigering
    const startEdit = (shift: Shift) => {
        // Hent dato og tid fra shift
        let shiftDate: string
        let startTime: string
        let endTime: string
        
        if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
            // Lokal tid string
            shiftDate = shift.startTime.split('T')[0]
            startTime = shift.startTime.split('T')[1].substring(0, 5)
            endTime = shift.endTime.split('T')[1].substring(0, 5)
        } else {
            // UTC tid - bruk som før
            shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
            startTime = new Date(shift.startTime).toTimeString().slice(0, 5)
            endTime = new Date(shift.endTime).toTimeString().slice(0, 5)
        }
        
        setEditingShift(shift)
        setEditForm({
            id: shift.id,
            userId: shift.userId,
            date: shiftDate,
            startTime: startTime,
            endTime: endTime,
            location: shift.location || '',
            notes: shift.notes || '',
            createdBy: shift.createdBy,
        })
        setShowEditForm(true)
    }

    // Formater dato til norsk format
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('nb-NO', {
            day: '2-digit',
            month: 'short'
        })
    }

    // Formater ukedag
    const formatWeekday = (date: Date) => {
        return date.toLocaleDateString('nb-NO', {
            weekday: 'short'
        }).toUpperCase()
    }

    // Hent skift for spesifikk ansatt og dato
    const getShiftForEmployeeAndDate = (employeeId: string, date: Date) => {
        // Normaliser datoen til start av dagen for sammenligning
        const normalizedDate = new Date(date)
        normalizedDate.setHours(0, 0, 0, 0)
        
        return shifts.find(shift => {
            let shiftDate: Date
            
            if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                // Lokal tid string - parse som lokal tid
                const [datePart, timePart] = shift.startTime.split('T')
                const [year, month, day] = datePart.split('-').map(Number)
                shiftDate = new Date(year, month - 1, day) // month er 0-basert
            } else {
                // UTC tid - bruk som før
                shiftDate = new Date(shift.startTime)
            }
            
            const normalizedShiftDate = new Date(shiftDate)
            normalizedShiftDate.setHours(0, 0, 0, 0)
            
            return shift.userId === employeeId && normalizedShiftDate.getTime() === normalizedDate.getTime()
        })
    }

    // ← Ny: Sjekk om ansatt har fravær på en dato
    const hasAbsenceOnDate = (employeeId: string, date: Date) => {
        const dateStr = date.toISOString().split('T')[0]
        
        return absences.some(absence => {
            if (absence.userId !== employeeId) return false
            if (absence.status !== 'APPROVED') return false
            if (absence.isHidden) return false // Filtrer bort skjulte forespørsler
            
            const fromDate = new Date(absence.fromDate).toISOString().split('T')[0]
            const toDate = new Date(absence.toDate).toISOString().split('T')[0]
            
            return dateStr >= fromDate && dateStr <= toDate
        })
    }

    // ← Ny: Sjekk om det finnes ledige skift på en dato
    const hasAvailableShiftOnDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0]
        
        return availableShifts.some(shift => {
            let shiftDate: string
            if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                shiftDate = shift.startTime.split('T')[0]
            } else {
                shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
            }
            return shiftDate === dateStr && shift.isAvailableShift === true
        })
    }

    // ← Ny: Hent ledig skift for en dato
    const getAvailableShiftOnDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0]
        
        return availableShifts.find(shift => {
            let shiftDate: string
            if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                shiftDate = shift.startTime.split('T')[0]
            } else {
                shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
            }
            return shiftDate === dateStr && shift.isAvailableShift === true
        })
    }

    // ← Ny: Hent fraværstype for en ansatt på en dato
    const getAbsenceTypeOnDate = (employeeId: string, date: Date) => {
        const dateStr = date.toISOString().split('T')[0]
        
        const absence = absences.find(absence => {
            if (absence.userId !== employeeId) return false
            if (absence.status !== 'APPROVED') return false
            if (absence.isHidden) return false // Filtrer bort skjulte forespørsler
            
            const fromDate = new Date(absence.fromDate).toISOString().split('T')[0]
            const toDate = new Date(absence.toDate).toISOString().split('T')[0]
            
            return dateStr >= fromDate && dateStr <= toDate
        })
        
        return absence ? absence.type : null
    }

    // Oppdater getShiftsForDate for å inkludere AI-skift
    const getShiftsForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0]

        
        // ← Hent eksisterende skift fra databasen
        const existingShifts = shifts.filter(shift => {
            let shiftDate: string
            if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                // Lokal tid string
                shiftDate = shift.startTime.split('T')[0]
            } else {
                // UTC tid - bruk som før
                shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
            }
            return shiftDate === dateStr
        })
        
        // ← Hent AI-genererte skift for samme dato
        let aiShifts: any[] = []
        if (aiGeneratedSchedule && aiGeneratedSchedule.shifts) {
            aiShifts = aiGeneratedSchedule.shifts.filter((shift: any) => {
                return shift.date === dateStr
            }).map((aiShift: any) => {

                
                const convertedShift = {
                id: `ai-${aiShift.employeeId}-${aiShift.date}`,
                userId: aiShift.employeeId,
                // Konverter AI-skift til lokal tid format (YYYY-MM-DDTHH:MM:SS)
                startTime: `${aiShift.date}T${aiShift.startTime}:00`,
                endTime: `${aiShift.date}T${aiShift.endTime}:00`,
                location: 'AI-generert',
                notes: `AI: ${aiShift.shiftType}`,
                createdBy: 'AI',
                user: { id: aiShift.employeeId, name: aiShift.employeeName },
                hours: aiShift.hours // Inkluder timer for AI-skift
                }
                

                
                return convertedShift
            })
        }
        
        // ← Hent ledige skift for samme dato
        let availableShiftsForDate: any[] = []
        if (availableShifts.length > 0) {
            availableShiftsForDate = availableShifts.filter((shift: any) => {
                let shiftDate: string
                if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                    shiftDate = shift.startTime.split('T')[0]
                } else {
                    shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
                }
                return shiftDate === dateStr && shift.isAvailableShift === true
            }).map((availableShift: any) => ({
                id: `available-${availableShift.id}`,
                userId: 'AVAILABLE',
                startTime: availableShift.startTime,
                endTime: availableShift.endTime,
                location: availableShift.location || 'Ledig skift',
                notes: availableShift.notes || 'Ledig for påmelding',
                createdBy: availableShift.createdBy,
                user: { id: 'AVAILABLE', name: 'Ledig skift' }
            }))
        }
        
        // ← Kombiner og sorter alle skift
        const allShifts = [...existingShifts, ...aiShifts, ...availableShiftsForDate]

        
        const sortedShifts = allShifts.sort((a, b) => {
            // Fiks sortering for AI-skift
            let aTime: number
            let bTime: number
            
            if (a.createdBy === 'AI') {
                // AI-skift: nå konvertert til lokal tid format, bruk som eksisterende skift
                if (a.startTime.includes('T') && !a.startTime.includes('Z') && !a.startTime.includes('+')) {
                    // Lokal tid string
                    const [hour, min] = a.startTime.split('T')[1].substring(0, 5).split(':').map(Number)
                    aTime = hour * 60 + min
                } else {
                    // Fallback
                    aTime = 0
                }

            } else {
                // Eksisterende skift: bruk ISO-string
                if (a.startTime.includes('T') && !a.startTime.includes('Z') && !a.startTime.includes('+')) {
                    // Lokal tid string
                    const [hour, min] = a.startTime.split('T')[1].substring(0, 5).split(':').map(Number)
                    aTime = hour * 60 + min
                } else {
                    // UTC tid
                    aTime = new Date(a.startTime).getTime()
                }

            }
            
            if (b.createdBy === 'AI') {
                // AI-skift: nå konvertert til lokal tid format, bruk som eksisterende skift
                if (b.startTime.includes('T') && !b.startTime.includes('Z') && !b.startTime.includes('+')) {
                    // Lokal tid string
                    const [hour, min] = b.startTime.split('T')[1].substring(0, 5).split(':').map(Number)
                    bTime = hour * 60 + min
                } else {
                    // Fallback
                    bTime = 0
                }

            } else {
                // Eksisterende skift: bruk ISO-string
                if (b.startTime.includes('T') && !b.startTime.includes('Z') && !b.startTime.includes('+')) {
                    // Lokal tid string
                    const [hour, min] = b.startTime.split('T')[1].substring(0, 5).split(':').map(Number)
                    bTime = hour * 60 + min
                } else {
                    // UTC tid
                    bTime = new Date(b.startTime).getTime()
                }

            }
            
            return aTime - bTime
        })
        

        
        return sortedShifts
    }

    // Hent alle unike starttider for en dato (for å lage rader)
    const getUniqueStartTimes = (date: Date) => {
        const shiftsForDate = getShiftsForDate(date)

        
        const startTimes = shiftsForDate.map(shift => {

            
            if (shift.createdBy === 'AI') {
                // AI-skift: nå konvertert til lokal tid format, bruk som eksisterende skift
                if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                    // Lokal tid string (YYYY-MM-DDTHH:MM:SS)
                    const [datePart, timePart] = shift.startTime.split('T')
                    const [hour, min] = timePart.split(':').map(Number)
                    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min)
                    const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
                    const timestamp = time.getTime()
                    

                    
                    return {
                        time,
                        timeString,
                        timestamp
                    }
                } else {
                    // Fallback for gamle AI-skift format
                    const [hour, min] = shift.startTime.split(':').map(Number)
                    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min)
                    const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
                    const timestamp = time.getTime()
                    

                    
                    return {
                        time,
                        timeString,
                        timestamp
                    }
                }
            } else if (shift.isAvailableShift === true) {
                // Ledige skift: bruk samme logikk som eksisterende skift
                let startTime: Date
                let timeString: string
                let timestamp: number
                
                if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                    // Lokal tid string (YYYY-MM-DDTHH:MM:SS)
                    const [datePart, timePart] = shift.startTime.split('T')
                    const [hour, min] = timePart.split(':').map(Number)
                    startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min)
                    timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
                    timestamp = startTime.getTime()
                } else {
                    // UTC tid - bruk som før
                    startTime = new Date(shift.startTime)
                    timeString = startTime.toTimeString().slice(0, 5)
                    timestamp = startTime.getTime()
                }
                
                return {
                    time: startTime,
                    timeString,
                    timestamp
                }
            } else {
                // Eksisterende skift: bruk ISO-string eller lokal tid string
                let startTime: Date
                let timeString: string
                let timestamp: number
                
                if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                    // Lokal tid string (YYYY-MM-DDTHH:MM:SS)
                    const [datePart, timePart] = shift.startTime.split('T')
                    const [hour, min] = timePart.split(':').map(Number)
                    startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min)
                    timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
                    timestamp = startTime.getTime()
                } else {
                    // UTC tid - bruk som før
                    startTime = new Date(shift.startTime)
                    timeString = startTime.toTimeString().slice(0, 5)
                    timestamp = startTime.getTime()
                }
                
                return {
                    time: startTime,
                    timeString,
                    timestamp
                }
            }
        })
        
        // Fjern duplikater og sorter
        const uniqueTimes = startTimes.filter((time, index, self) => 
            index === self.findIndex(t => t.timeString === time.timeString)
        ).sort((a, b) => a.timestamp - b.timestamp)
        

        
        return uniqueTimes
    }

    // ← Oppdater getShiftForEmployeeDateAndTime for å inkludere AI-skift
    const getShiftForEmployeeDateAndTime = (employeeId: string, date: Date, startTime: string) => {
        const dateStr = date.toISOString().split('T')[0]
        
        // ← Sjekk eksisterende skift
        const existingShift = shifts.find(shift => {
            let shiftDate: string
            let shiftStartTime: string
            
            if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                // Lokal tid string
                shiftDate = shift.startTime.split('T')[0]
                shiftStartTime = shift.startTime.split('T')[1].substring(0, 5)
            } else {
                // UTC tid - bruk som før
                shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
                shiftStartTime = new Date(shift.startTime).toTimeString().slice(0, 5)
            }
            
            return shift.userId === employeeId && shiftDate === dateStr && shiftStartTime === startTime
        })
        
        if (existingShift) return existingShift
        
        // ← Sjekk AI-genererte skift
        if (aiGeneratedSchedule && aiGeneratedSchedule.shifts) {
            const aiShift = aiGeneratedSchedule.shifts.find((shift: any) => {
                return shift.employeeId === employeeId && shift.date === dateStr && shift.startTime === startTime
            })
            
            if (aiShift) {
                // ← Konverter AI-skift til samme format
                return {
                    id: `ai-${aiShift.employeeId}-${aiShift.date}`,
                    userId: aiShift.employeeId,
                    // Konverter AI-skift til lokal tid format (YYYY-MM-DDTHH:MM:SS)
                    startTime: `${aiShift.date}T${aiShift.startTime}:00`,
                    endTime: `${aiShift.date}T${aiShift.endTime}:00`,
                    location: 'AI-generert',
                    notes: `AI: ${aiShift.shiftType}`,
                    createdBy: 'AI',
                    user: { id: aiShift.employeeId, name: aiShift.employeeName },
                    hours: aiShift.hours // Inkluder timer for AI-skift
                }
            }
        }
        
        // ← Sjekk ledige skift
        if (availableShifts.length > 0) {
            const availableShift = availableShifts.find((shift: any) => {
                let shiftDate: string
                let shiftStartTime: string
                
                if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                    shiftDate = shift.startTime.split('T')[0]
                    shiftStartTime = shift.startTime.split('T')[1].substring(0, 5)
                } else {
                    shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
                    shiftStartTime = new Date(shift.startTime).toTimeString().slice(0, 5)
                }
                
                return shift.isAvailableShift === true && shiftDate === dateStr && shiftStartTime === startTime
            })
            
            if (availableShift) {
                return {
                    id: `available-${availableShift.id}`,
                    userId: 'AVAILABLE',
                    startTime: availableShift.startTime,
                    endTime: availableShift.endTime,
                    location: availableShift.location || 'Ledig skift',
                    notes: availableShift.notes || 'Ledig for påmelding',
                    createdBy: availableShift.createdBy,
                    user: { id: 'AVAILABLE', name: 'Ledig skift' }
                }
            }
        }
        
        return null
    }

    // Hent alle ansatte som har skift på en spesifikk dato og starttid
    const getEmployeesWithShiftAtTime = (date: Date, startTime: string) => {
        const dateStr = date.toISOString().split('T')[0]
        
        // Hent vanlige skift
        const regularShifts = shifts
            .filter(shift => {
                let shiftDate: string
                let shiftStartTime: string
                
                if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                    // Lokal tid string
                    shiftDate = shift.startTime.split('T')[0]
                    shiftStartTime = shift.startTime.split('T')[1].substring(0, 5)
                } else {
                    // UTC tid - bruk som før
                    shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
                    shiftStartTime = new Date(shift.startTime).toTimeString().slice(0, 5)
                }
                
                return shiftDate === dateStr && shiftStartTime === startTime
            })
            .map(shift => shift.userId)
        
        // Hent ledige skift
        const availableShiftsAtTime = availableShifts
            .filter(shift => {
                let shiftDate: string
                let shiftStartTime: string
                
                if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
                    shiftDate = shift.startTime.split('T')[0]
                    shiftStartTime = shift.startTime.split('T')[1].substring(0, 5)
                } else {
                    shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
                    shiftStartTime = new Date(shift.startTime).toTimeString().slice(0, 5)
                }
                
                return shiftDate === dateStr && shiftStartTime === startTime && shift.isAvailableShift === true
            })
            .map(shift => 'AVAILABLE')
        
        return [...regularShifts, ...availableShiftsAtTime]
    }

    // Enkel funksjon for å trekke fra 2 timer fra alle tidspunkter
    const subtractTwoHours = (timeString: string) => {
        if (!timeString.includes(':')) return timeString
        
        const [hours, minutes] = timeString.split(':').map(Number)
        let newHours = hours - 2
        
        // Håndter overgang til forrige dag
        if (newHours < 0) {
            newHours += 24
        }
        
        return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    // Oppdater formatTime funksjonen
    const formatTime = (dateString: string) => {

        
        let result: string
        
        // Hvis det er AI-skift (kun HH:MM)
        if (!dateString.includes('T') && dateString.includes(':') && !dateString.includes('Z') && !dateString.includes('+')) {
            // Returner tiden direkte for AI-skift
            result = dateString
        } else if (dateString.includes('T') && dateString.includes(':') && !dateString.includes('Z') && !dateString.includes('+')) {
            // Hvis det er en lokal tid string (YYYY-MM-DDTHH:MM:SS uten Z eller +)
            // Parse som lokal tid uten timezone-konvertering
            const [datePart, timePart] = dateString.split('T')
            const [hours, minutes] = timePart.split(':')
            result = `${hours}:${minutes}`
        } else if (dateString.includes('Z') || dateString.includes('+')) {
            // ISO string med timezone - parse riktig
            const date = new Date(dateString)
            result = date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })

        } else {
            // Kun tid (HH:MM) - returner direkte
            result = dateString
        }
        
        // Trekk fra 2 timer fra alle tidspunkter
        const adjustedTime = subtractTwoHours(result)
        
        return adjustedTime
    }

// Erstatt hele getDuration med denne
const getDuration = (startTime: string, endTime: string) => {
    // Normaliser til Date-objekter
    let start: Date;
    let end: Date;
  
    if (startTime.includes('T') && !startTime.includes('Z') && !startTime.includes('+')) {
      // Lokal "YYYY-MM-DDTHH:MM:SS"
      const [d1, t1] = startTime.split('T');
      const [y1, m1, da1] = d1.split('-').map(Number);
      const [h1, mi1, s1 = '0'] = t1.split(':');
      start = new Date(y1, (m1 - 1), da1, Number(h1), Number(mi1), Number(s1));
  
      const [d2, t2] = endTime.split('T');
      const [y2, m2, da2] = d2.split('-').map(Number);
      const [h2, mi2, s2 = '0'] = t2.split(':');
      end = new Date(y2, (m2 - 1), da2, Number(h2), Number(mi2), Number(s2));
    } else {
      // ISO med Z/+ eller annet: la Date håndtere parsing
      start = new Date(startTime);
      end = new Date(endTime);
    }
  
    // Hvis sluttiden ikke er etter start (overnight), legg til 24h på end
    if (end.getTime() <= start.getTime()) {
      end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
    }
  
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60)); // evt. Math.floor hvis du vil alltid runde ned
  
    return `${diffHours} hrs.`;
  };
  

    // Naviger til forrige uke
    const goToPreviousWeek = () => {
        const newWeek = new Date(currentWeek)
        newWeek.setDate(currentWeek.getDate() - 7)
        setCurrentWeek(newWeek)
    }

    // Naviger til neste uke
    const goToNextWeek = () => {
        const newWeek = new Date(currentWeek)
        newWeek.setDate(currentWeek.getDate() + 7)
        setCurrentWeek(newWeek)
    }

    // Gå til dagens uke
    const goToToday = () => {
        setCurrentWeek(new Date())
    }

    // Formater uke for visning
    const formatWeekRange = () => {
        const days = getWeekDays()
        const start = days[0]
        const end = days[6]
        return `${start.getDate()} ${start.toLocaleDateString('nb-NO', { month: 'short' })} - ${end.getDate()} ${end.toLocaleDateString('nb-NO', { month: 'short' })}`
    }

    // Oppdater handleAddShiftClick for å håndtere timezone riktig
    const handleAddShiftClick = (employeeId: string, date: Date) => {
        // Bruk en enkel metode: kopier datoen uten å endre timezone
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        
        // Formater til YYYY-MM-DD
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        
        // Finn ansatt basert på ID
        const employee = employees.find(emp => emp.id === employeeId)
        
        // Oppdater skjema med ansatt og dato
        setForm({
            userId: employeeId,
            date: formattedDate,
            startTime: '',
            endTime: '',
            location: '',
            notes: '',
            createdBy: 'admin',
        })
        
        // Vis skjemaet
        setShowForm(true)
    }

    // ← Ny: Fravær funksjoner
    const handleAbsenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setAbsenceForm({ ...absenceForm, [e.target.name]: e.target.value })
    }

    const handleAbsenceSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            // Opprett fraværsforespørsel kun hvis det er en spesifikk ansatt
            if (absenceForm.userId) {
                const absenceResponse = await axios.post('http://localhost:3001/time-off-requests', {
                    userId: absenceForm.userId,
                    fromDate: `${absenceForm.fromDate}T00:00:00.000Z`,
                    toDate: `${absenceForm.toDate}T23:59:59.999Z`,
                    type: absenceForm.type,
                    reason: absenceForm.reason
                }, { withCredentials: true })

                // Godkjenn fraværsforespørselen automatisk (admin gjør det)
                if (absenceResponse.data.id) {
                    await axios.post(`http://localhost:3001/time-off-requests/${absenceResponse.data.id}/approve`, {}, { withCredentials: true })
                }
            }

            // Slett skiftet hvis det finnes og ikke er AI-generert eller ledig skift
            if (absenceForm.shiftId && !absenceForm.shiftId.startsWith('ai-') && !absenceForm.shiftId.startsWith('available-')) {
                await axios.delete(`http://localhost:3001/shifts/${absenceForm.shiftId}`, { withCredentials: true })
            }

            // Oppdater AI-skiftplan hvis det var et AI-skift
            if (absenceForm.shiftId && absenceForm.shiftId.startsWith('ai-')) {
                // Fjern fra AI-generert skiftplan
                if (aiGeneratedSchedule && aiGeneratedSchedule.shifts) {
                    const updatedShifts = aiGeneratedSchedule.shifts.filter((shift: any) => {
                        const shiftId = `ai-${shift.employeeId}-${shift.date}`
                        return shiftId !== absenceForm.shiftId
                    })
                    setAiGeneratedSchedule({
                        ...aiGeneratedSchedule,
                        shifts: updatedShifts
                    })
                }
            }

            // Oppdater ledige skift hvis det var et ledig skift
            if (absenceForm.shiftId && absenceForm.shiftId.startsWith('available-')) {
                // Fjern fra ledige skift
                const updatedAvailableShifts = availableShifts.filter((shift: any) => {
                    const shiftId = `available-${shift.id}`
                    return shiftId !== absenceForm.shiftId
                })
                setAvailableShifts(updatedAvailableShifts)
            }

            setShowAbsenceForm(false)
            setAbsenceForm({
                userId: '',
                fromDate: '',
                toDate: '',
                type: 'SICK',
                reason: '',
                shiftId: ''
            })
            setSuccess(absenceForm.userId ? 'Ansatt satt i fravær og skift fjernet!' : 'Ledig skift fjernet!')
            fetchShifts()
            fetchAbsences()
            fetchAvailableShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            console.error('Feil ved setting av fravær:', err)
            if (err.response?.data?.message) {
                setError(`Feil ved setting av fravær: ${err.response.data.message}`)
            } else {
                setError('Feil ved setting av fravær. Sjekk konsollen for detaljer.')
            }
        }
    }

    const startAbsenceForm = (shift: Shift) => {
        // Hent dato fra shift
        let shiftDate: string
        if (shift.startTime.includes('T') && !shift.startTime.includes('Z') && !shift.startTime.includes('+')) {
            shiftDate = shift.startTime.split('T')[0]
        } else {
            shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
        }
        
        // Hent ansattnavn for visning
        const employee = employees.find(emp => emp.id === shift.userId)
        const employeeName = employee ? employee.name : 'Ukjent ansatt'
        
        // Hent ansattnavn for ledige skift
        const availableShiftName = shift.userId === 'AVAILABLE' ? 'Ledig skift' : employeeName
        
        setAbsenceForm({
            userId: shift.userId === 'AVAILABLE' ? '' : shift.userId, // Tom for ledige skift
            fromDate: shiftDate,
            toDate: shiftDate,
            type: 'SICK', // Standard til sykdom, men kan endres
            reason: shift.userId === 'AVAILABLE' ? 'Ledig skift fjernet' : 'Ringer og sier at jeg ikke kan jobbe i dag', // Standardårsak
            shiftId: shift.id
        })
        setShowAbsenceForm(true)
        
        // Vis bekreftelse for AI-skift
        if (shift.createdBy === 'AI') {
            alert(`Merk: Dette er et AI-generert skift for ${availableShiftName}. Ved å sette i fravær vil skiftet fjernes fra AI-planen.`)
        }
        
        // Vis bekreftelse for ledige skift
        if (shift.userId === 'AVAILABLE') {
            alert(`Merk: Dette er et ledig skift. Ved å sette i fravær vil skiftet fjernes fra ledige skift.`)
        }
    }

    // ← Ny: Ledige skift funksjoner
    const handleAvailableShiftChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setAvailableShiftForm({ ...availableShiftForm, [e.target.name]: e.target.value })
    }

    const handleAvailableShiftSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            // Opprett ledig skift (uten tilordnet ansatt)
            await axios.post('http://localhost:3001/shifts', {
                startTime: `${availableShiftForm.date}T${availableShiftForm.startTime}:00.000Z`,
                endTime: `${availableShiftForm.date}T${availableShiftForm.endTime}:00.000Z`,
                location: availableShiftForm.location,
                notes: availableShiftForm.notes,
                createdBy: availableShiftForm.createdBy,
                isAvailableShift: true
            }, { withCredentials: true })

            setShowAvailableShiftForm(false)
            setAvailableShiftForm({
                date: '',
                startTime: '',
                endTime: '',
                location: '',
                notes: '',
                createdBy: 'admin'
            })
            setSuccess('Ledig skift lagt ut!')
            fetchShifts()
            fetchAvailableShifts()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            console.error('Feil ved opprettelse av ledig skift:', err)
            if (err.response?.data?.message) {
                setError(`Feil ved opprettelse av ledig skift: ${err.response.data.message}`)
            } else {
                setError('Feil ved opprettelse av ledig skift. Sjekk konsollen for detaljer.')
            }
        }
    }

    const startAvailableShiftForm = () => {
        setAvailableShiftForm({
            date: new Date().toISOString().split('T')[0],
            startTime: '07:00',
            endTime: '15:00',
            location: '',
            notes: '',
            createdBy: 'admin'
        })
        setShowAvailableShiftForm(true)
    }

    // ← Ny: AI Scheduler funksjoner
    const handleAiScheduleApproval = async (approved: boolean) => {
        if (approved && aiGeneratedSchedule) {
            try {
                // Konverter AI-skiftplan til faktiske skift i databasen
                await axios.post('http://localhost:3001/ai/apply-schedule', {
                    scheduleId: aiGeneratedSchedule.id,
                    approved: true
                });
                
                // Oppdater skift-visningen
                fetchShifts(); // Changed from refreshShifts to fetchShifts
                setShowAiScheduler(false);
                setAiGeneratedSchedule(null);
                
                // Vis suksessmelding
                setSuccess('AI-skiftplan ble godkjent og lagt til!');
            } catch (error) {
                console.error('Feil ved godkjenning av AI-skiftplan:', error);
            }
        } else {
            setShowAiScheduler(false);
            setAiGeneratedSchedule(null);
        }
    };

    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress size={60} />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ 
                minHeight: '100vh',
                backgroundColor: '#e8edf5',

            }}>
                <Box sx={{ p: 3 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {success && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            {success}
                        </Alert>
                    )}
                    <Card elevation={2} sx={{ borderRadius: '16px 16px 0 0' }}>
                        <CardContent sx={{ p: 0, borderRadius: '16px 16px 0 0' }}>
                            {/* Date Navigation */}
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                p: 3,
                                backgroundColor: '#f8faff',
                                borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
                                borderTopLeftRadius: 3,
                                borderTopRightRadius: 3
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <IconButton onClick={goToPreviousWeek}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                    <Typography variant="h6" fontWeight="bold">
                                        {formatWeekRange()}
                                    </Typography>
                                    <IconButton onClick={goToNextWeek}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        onClick={startAvailableShiftForm}
                                        sx={{
                                            backgroundColor: '#2563eb',
                                            '&:hover': { backgroundColor: '#1d4ed8' },
                                            px: 3,
                                            py: 1,
                                            borderRadius: 2,
                                            fontWeight: 700,
                                            fontSize: '0.95rem',
                                            boxShadow: 'none'
                                        }}
                                    >
                                        + Legg ut ledig skift
                                    </Button>
                                    <IconButton onClick={goToToday}>
                                        <CalendarIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Dynamic Shift Board Table */}
                            <TableContainer sx={{ borderRadius: 2 }}>
                                <Table sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ 
                                                fontWeight: 'bold', 
                                                minWidth: 150, // Redusert fra 180 til 150
                                                maxWidth: 170, // Redusert fra 200 til 170
                                                backgroundColor: '#f8f9fa',
                                                borderRight: '1px solid #e0e0e0'
                                            }}>
                                                Employee Name
                                            </TableCell>
                                            {weekDays.map((day, dayIndex) => (
                                                <TableCell 
                                                    key={dayIndex}
                                                    align="center"
                                                    sx={{ 
                                                        fontWeight: 'bold',
                                                        minWidth: 100, // Redusert fra 120 til 100
                                                        maxWidth: 110, // Lagt til maxWidth for å begrense størrelsen
                                                        backgroundColor: '#f8f9fa',
                                                        borderRight: dayIndex < 6 ? '1px solid #e0e0e0' : 'none'
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography variant="body2" fontWeight="bold">
                                                            {day.getDate()} {formatWeekday(day)}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {day.toLocaleDateString('nb-NO', { month: 'short' })}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {employees.map((employee) => (
                                            <TableRow key={employee.id} hover>
                                                <TableCell sx={{ 
                                                    borderRight: '1px solid #e0e0e0',
                                                    backgroundColor: '#fafafa'
                                                }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar sx={{ 
                                                            bgcolor: 'light-grey',
                                                            width: 32,
                                                            height: 32,
                                                            fontSize: '0.875rem'
                                                        }}>
                                                            {employee.name.split(' ').map(n => n[0]).join('')}
                                                        </Avatar>
                                                        <Typography variant="body2" fontWeight="medium">
                                                            {employee.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                {weekDays.map((day, dayIndex) => {
                                                    const shift = getShiftForEmployeeAndDate(employee.id, day)
                                                    return (
                                                        <TableCell 
                                                            key={dayIndex}
                                                            align="center"
                                                            sx={{ 
                                                                borderRight: dayIndex < 6 ? '1px solid #e0e0e0' : 'none',
                                                                minHeight: 80,
                                                                position: 'relative'
                                                            }}
                                                        >
                                                            {shift ? (
                                                                <Box sx={{
                                                                    backgroundColor: '#ffffff',
                                                                    borderRadius: 2,
                                                                    p: 1.5, // Redusert fra p: 2 til p: 1.5
                                                                    border: shift.createdBy === 'AI' ? '2px solid #667eea' : '2px solid #e2e8f0',
                                                                    position: 'relative',
                                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                    '&:hover': {
                                                                        transform: 'translateY(-2px)',
                                                                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.15)'
                                                                    }
                                                                }}>
                                                                    {shift.createdBy === 'AI' && (
                                                                        <Box 
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                top: -8,
                                                                                right: -8,
                                                                                backgroundColor: '#667eea',
                                                                                color: 'white',
                                                                                borderRadius: '50%',
                                                                                width: 20,
                                                                                height: 20,
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                fontSize: '0.7rem',
                                                                                fontWeight: 'bold',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.2s ease-in-out',
                                                                                '&:hover': {
                                                                                    backgroundColor: '#5a6fd8',
                                                                                    transform: 'scale(1.1)'
                                                                                }
                                                                            }}
                                                                            onMouseEnter={(e) => {
                                                                                e.currentTarget.innerHTML = '+'
                                                                                e.currentTarget.style.fontSize = '1rem'
                                                                                e.currentTarget.style.fontWeight = 'bold'
                                                                            }}
                                                                            onMouseLeave={(e) => {
                                                                                e.currentTarget.innerHTML = 'AI'
                                                                                e.currentTarget.style.fontSize = '0.7rem'
                                                                                e.currentTarget.style.fontWeight = 'bold'
                                                                            }}
                                                                            onClick={() => {
                                                                                startEdit(shift)
                                                                            }}
                                                                            title="Klikk for å redigere AI-skift"
                                                                        >
                                                                            AI
                                                                        </Box>
                                                                    )}
                                                                    <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                                                                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {getDuration(shift.startTime, shift.endTime)}
                                                                    </Typography>
                                                                    {shift.createdBy === 'AI' && (
                                                                        <Typography 
                                                                            variant="caption" 
                                                                            sx={{ 
                                                                                display: 'block',
                                                                                color: '#667eea',
                                                                                fontWeight: 'bold',
                                                                                mt: 0.5
                                                                            }}
                                                                        >
                                                                            AI-generert
                                                                        </Typography>
                                                                    )}
                                                                    <Box sx={{ 
                                                                        display: 'flex', 
                                                                        gap: 0.5, 
                                                                        justifyContent: 'center', 
                                                                        mt: 1 
                                                                    }}>
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => startEdit(shift)}
                                                                            sx={{ 
                                                                                color: '#667eea',
                                                                                '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                                                                            }}
                                                                            title="Rediger skift (dobbeltklikk for fravær)"
                                                                            onDoubleClick={() => startAbsenceForm(shift)}
                                                                        >
                                                                            <EditIcon fontSize="small" />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleDelete(shift.id)}
                                                                            sx={{ 
                                                                                color: 'error.main',
                                                                                '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                                                                            }}
                                                                            title="Slett skift"
                                                                        >
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Box>
                                                                </Box>
                                                            ) : hasAbsenceOnDate(employee.id, day) ? (
                                                                // ← Vis fravær
                                                                (() => {
                                                                    const absenceType = getAbsenceTypeOnDate(employee.id, day)
                                                                    const getAbsenceIcon = (type: string) => {
                                                                        switch (type) {
                                                                            case 'SICK': return '🏥'
                                                                            case 'VACATION': return '🏖️'
                                                                            case 'OTHER': return '📝'
                                                                            default: return '🏥'
                                                                        }
                                                                    }
                                                                    const getAbsenceLabel = (type: string) => {
                                                                        switch (type) {
                                                                            case 'SICK': return 'Sykdom'
                                                                            case 'VACATION': return 'Ferie'
                                                                            case 'OTHER': return 'Annet'
                                                                            default: return 'Fravær'
                                                                        }
                                                                    }
                                                                    const getAbsenceColor = (type: string) => {
                                                                        switch (type) {
                                                                            case 'SICK': return '#ff9800'
                                                                            case 'VACATION': return '#4caf50'
                                                                            case 'OTHER': return '#9c27b0'
                                                                            default: return '#ff9800'
                                                                        }
                                                                    }
                                                                    
                                                                    return (
                                                                        <Box sx={{
                                                                            backgroundColor: `${getAbsenceColor(absenceType)}15`,
                                                                            borderRadius: 2,
                                                                            p: 1.5, // Redusert fra p: 2 til p: 1.5
                                                                            border: `2px solid ${getAbsenceColor(absenceType)}`,
                                                                            position: 'relative'
                                                                        }}>
                                                                            <Box sx={{
                                                                                position: 'absolute',
                                                                                top: -8,
                                                                                right: -8,
                                                                                backgroundColor: getAbsenceColor(absenceType),
                                                                                color: 'white',
                                                                                borderRadius: '50%',
                                                                                width: 20,
                                                                                height: 20,
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                fontSize: '0.7rem',
                                                                                fontWeight: 'bold'
                                                                            }}>
                                                                                {getAbsenceIcon(absenceType)}
                                                                            </Box>
                                                                            <Typography variant="body2" fontWeight="medium" color={getAbsenceColor(absenceType)}>
                                                                                {getAbsenceLabel(absenceType)}
                                                                            </Typography>
                                                                            <Typography variant="caption" color="text.secondary">
                                                                                Fravær
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                                })()
                                                            ) : hasAvailableShiftOnDate(day) ? (
                                                                // ← Vis ledig skift
                                                                (() => {
                                                                    const availableShift = getAvailableShiftOnDate(day)
                                                                    return (
                                                                        <Box sx={{
                                                                            backgroundColor: '#e8f5e8',
                                                                            borderRadius: 2,
                                                                            p: 1.5, // Redusert fra p: 2 til p: 1.5
                                                                            border: '2px solid #4caf50',
                                                                            position: 'relative',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s ease',
                                                                            '&:hover': {
                                                                                backgroundColor: '#c8e6c9',
                                                                                transform: 'translateY(-2px)',
                                                                                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                                                                            }
                                                                        }}>
                                                                            <Box sx={{
                                                                                position: 'absolute',
                                                                                top: -8,
                                                                                right: -8,
                                                                                backgroundColor: '#4caf50',
                                                                                color: 'white',
                                                                                borderRadius: '50%',
                                                                                width: 20,
                                                                                height: 20,
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                fontSize: '0.7rem',
                                                                                fontWeight: 'bold'
                                                                            }}>
                                                                                !
                                                                            </Box>
                                                                            <Typography variant="body2" fontWeight="medium" color="#2e7d32">
                                                                                Ledig skift
                                                                            </Typography>
                                                                            {availableShift && (
                                                                                <Typography variant="caption" color="text.secondary">
                                                                                    {formatTime(availableShift.startTime)} - {formatTime(availableShift.endTime)}
                                                                                </Typography>
                                                                            )}
                                                                        </Box>
                                                                    )
                                                                })()
                                                            ) : hasAiShiftOnDate(employee.id, day) ? (
                                                                // ← Vis AI-skift som "Ventende godkjenning"
                                                                <Box sx={{
                                                                    backgroundColor: '#ffffff',
                                                                    borderRadius: 2,
                                                                    p: 1.5, // Redusert fra p: 2 til p: 1.5
                                                                    border: '2px dashed #667eea',
                                                                    position: 'relative'
                                                                }}>
                                                                    <Box sx={{
                                                                        position: 'absolute',
                                                                        top: -8,
                                                                        right: -8,
                                                                        backgroundColor: '#667eea',
                                                                        color: 'white',
                                                                        borderRadius: '50%',
                                                                        width: 20,
                                                                        height: 20,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 'bold'
                                                                    }}>
                                                                        AI
                                                                    </Box>
                                                                    <Typography variant="body2" fontWeight="medium" color="#4a5568">
                                                                        AI-generert skift
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        Ventende godkjenning
                                                                    </Typography>
                                                                </Box>
                                                            ) : (
                                                                // ← Stilig stiplet "Legg til skift" boks (ikke vis hvis fravær eller ledige skift)
                                                                !hasAbsenceOnDate(employee.id, day) && !hasAvailableShiftOnDate(day) && (
                                                                    <Box 
                                                                        sx={{
                                                                            width: '100%',
                                                                            height: 60,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            cursor: 'pointer',
                                                                            borderRadius: 2,
                                                                            border: '2px dashed #667eea',
                                                                            transition: 'all 0.2s ease',
                                                                            backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                                                            '&:hover': {
                                                                                borderColor: '#5a6fd8',
                                                                                backgroundColor: 'rgba(102, 126, 234, 0.1)'
                                                                            }
                                                                        }}
                                                                        onClick={() => handleAddShiftClick(employee.id, day)}
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                width: 32,
                                                                                height: 32,
                                                                                borderRadius: '50%',
                                                                                backgroundColor: '#667eea',
                                                                                color: 'white',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                transition: 'all 0.2s ease',
                                                                                '&:hover': {
                                                                                    backgroundColor: '#5a6fd8',
                                                                                    transform: 'scale(1.1)'
                                                                                }
                                                                            }}
                                                                        >
                                                                            <AddIcon sx={{ fontSize: 20 }} />
                                                                        </Box>
                                                                    </Box>
                                                                )
                                                            )}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                

                    {/* Skjema for nytt skift - oppdatert for å vise forhåndsutfylt data */}
                    <Dialog 
                        open={showForm} 
                        onClose={() => setShowForm(false)}
                        maxWidth="md"
                        fullWidth
                    >
                        <DialogTitle sx={{ pb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ScheduleIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">
                                    Opprett nytt skift
                                </Typography>
                            </Box>
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Ansatt</InputLabel>
                                            <Select
                                                name="userId"
                                                value={form.userId}
                                                onChange={handleChange}
                                                label="Ansatt"
                                                required
                                            >
                                                {employees.map(emp => (
                                                    <MenuItem key={emp.id} value={emp.id}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                                                {emp.name.charAt(0)}
                                                            </Avatar>
                                                            {emp.name}
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Dato"
                                            name="date"
                                            type="date"
                                            value={form.date}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Starttid"
                                            name="startTime"
                                            type="time"
                                            value={form.startTime}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Sluttid"
                                            name="endTime"
                                            type="time"
                                            value={form.endTime}
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Lokasjon (valgfritt)"
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Notater (valgfritt)"
                                            name="notes"
                                            value={form.notes}
                                            onChange={handleChange}
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, pt: 1 }}>
                                <Button
                                    onClick={() => setShowForm(false)}
                                    startIcon={<CancelIcon />}
                                    variant="outlined"
                                >
                                    Avbryt
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #667eea 100%)',
                                        }
                                    }}
                                >
                                    Lagre skift
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* Skjema for redigering */}
                    <Dialog 
                        open={showEditForm} 
                        onClose={() => setShowEditForm(false)}
                        maxWidth="md"
                        fullWidth
                    >
                        <DialogTitle sx={{ pb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EditIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">
                                    Rediger skift
                                </Typography>
                            </Box>
                        </DialogTitle>
                        <form onSubmit={handleEdit}>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Ansatt</InputLabel>
                                            <Select
                                                name="userId"
                                                value={editForm.userId}
                                                onChange={handleEditChange}
                                                label="Ansatt"
                                                required
                                            >
                                                {employees.map(emp => (
                                                    <MenuItem key={emp.id} value={emp.id}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                                                {emp.name.charAt(0)}
                                                            </Avatar>
                                                            {emp.name}
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Dato"
                                            name="date"
                                            type="date"
                                            value={editForm.date}
                                            onChange={handleEditChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Starttid"
                                            name="startTime"
                                            type="time"
                                            value={editForm.startTime}
                                            onChange={handleEditChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Sluttid"
                                            name="endTime"
                                            type="time"
                                            value={editForm.endTime}
                                            onChange={handleEditChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Lokasjon (valgfritt)"
                                            name="location"
                                            value={editForm.location}
                                            onChange={handleEditChange}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Notater (valgfritt)"
                                            name="notes"
                                            value={editForm.notes}
                                            onChange={handleEditChange}
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, pt: 1 }}>
                                <Button
                                    onClick={() => setShowEditForm(false)}
                                    startIcon={<CancelIcon />}
                                    variant="outlined"
                                >
                                    Avbryt
                                </Button>
                                <Button
                                    onClick={() => {
                                        // Sett fravær-formularen med data fra rediger-skjemaet
                                        setAbsenceForm({
                                            userId: editForm.userId,
                                            fromDate: editForm.date,
                                            toDate: editForm.date,
                                            type: 'SICK',
                                            reason: 'Satt i fravær fra rediger-skift',
                                            shiftId: editForm.id
                                        })
                                        setShowEditForm(false)
                                        setShowAbsenceForm(true)
                                    }}
                                    startIcon={<PersonIcon />}
                                    variant="outlined"
                                    color="warning"
                                    sx={{ 
                                        mr: 'auto',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 152, 0, 0.1)',
                                            borderColor: 'warning.main',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 4px 8px rgba(255, 152, 0, 0.2)'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Sett i fravær
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #667eea 100%)',
                                        }
                                    }}
                                >
                                    Oppdater skift
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* Fraværsformular */}
                    <Dialog 
                        open={showAbsenceForm} 
                        onClose={() => setShowAbsenceForm(false)}
                        maxWidth="md"
                        fullWidth
                    >
                        <DialogTitle sx={{ pb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon color="warning" />
                                <Typography variant="h6" fontWeight="bold">
                                    Sett ansatt i fravær
                                </Typography>
                            </Box>
                            {(() => {
                                const employee = employees.find(emp => emp.id === absenceForm.userId)
                                return employee ? (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {employee.name}
                                    </Typography>
                                ) : null
                            })()}
                        </DialogTitle>
                        <form onSubmit={handleAbsenceSubmit}>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Alert severity="info" sx={{ mb: 2 }}>
                                            Dette vil fjerne skiftet og sette ansatten i fravær for den valgte perioden.
                                        </Alert>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Ansatt</InputLabel>
                                            <Select
                                                name="userId"
                                                value={absenceForm.userId}
                                                onChange={handleAbsenceChange}
                                                label="Ansatt"
                                                required
                                            >
                                                <MenuItem value="">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'grey.400' }}>
                                                            ?
                                                        </Avatar>
                                                        Ledig skift (ingen ansatt)
                                                    </Box>
                                                </MenuItem>
                                                {employees.map(emp => (
                                                    <MenuItem key={emp.id} value={emp.id}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                                                {emp.name.charAt(0)}
                                                            </Avatar>
                                                            {emp.name}
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Fraværstype</InputLabel>
                                            <Select
                                                name="type"
                                                value={absenceForm.type}
                                                onChange={handleAbsenceChange}
                                                label="Fraværstype"
                                                required
                                            >
                                                <MenuItem value="SICK">Sykdom</MenuItem>
                                                <MenuItem value="VACATION">Ferie</MenuItem>
                                                <MenuItem value="OTHER">Annet</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Fra dato"
                                            name="fromDate"
                                            type="date"
                                            value={absenceForm.fromDate}
                                            onChange={handleAbsenceChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Til dato"
                                            name="toDate"
                                            type="date"
                                            value={absenceForm.toDate}
                                            onChange={handleAbsenceChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Årsak til fravær (valgfritt)"
                                            name="reason"
                                            value={absenceForm.reason}
                                            onChange={handleAbsenceChange}
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                            placeholder="F.eks. Ringer og sier at jeg ikke kan jobbe i dag"
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, pt: 1 }}>
                                <Button
                                    onClick={() => setShowAbsenceForm(false)}
                                    startIcon={<CancelIcon />}
                                    variant="outlined"
                                >
                                    Avbryt
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="warning"
                                    startIcon={<PersonIcon />}
                                    sx={{
                                        background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #f57c00 0%, #ef6c00 100%)',
                                        }
                                    }}
                                >
                                    Sett i fravær
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* Ledig skift formular */}
                    <Dialog 
                        open={showAvailableShiftForm} 
                        onClose={() => setShowAvailableShiftForm(false)}
                        maxWidth="md"
                        fullWidth
                    >
                        <DialogTitle sx={{ pb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AddIcon color="success" />
                                <Typography variant="h6" fontWeight="bold">
                                    Legg ut ledig skift
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Dette skiftet vil vises til alle ansatte som ledig for påmelding
                            </Typography>
                        </DialogTitle>
                        <form onSubmit={handleAvailableShiftSubmit}>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Alert severity="info" sx={{ mb: 2 }}>
                                            Ledige skift vises til alle ansatte med et utropstegn (!) i kalenderen.
                                        </Alert>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Dato"
                                            name="date"
                                            type="date"
                                            value={availableShiftForm.date}
                                            onChange={handleAvailableShiftChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Starttid"
                                            name="startTime"
                                            type="time"
                                            value={availableShiftForm.startTime}
                                            onChange={handleAvailableShiftChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Sluttid"
                                            name="endTime"
                                            type="time"
                                            value={availableShiftForm.endTime}
                                            onChange={handleAvailableShiftChange}
                                            required
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Lokasjon (valgfritt)"
                                            name="location"
                                            value={availableShiftForm.location}
                                            onChange={handleAvailableShiftChange}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Beskrivelse (valgfritt)"
                                            name="notes"
                                            value={availableShiftForm.notes}
                                            onChange={handleAvailableShiftChange}
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                            placeholder="F.eks. Ekstra hjelp trengs, bonus for overtid, etc."
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, pt: 1 }}>
                                <Button
                                    onClick={() => setShowAvailableShiftForm(false)}
                                    startIcon={<CancelIcon />}
                                    variant="outlined"
                                >
                                    Avbryt
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    startIcon={<AddIcon />}
                                    sx={{
                                        backgroundColor: '#667eea',
                                        '&:hover': {
                                            backgroundColor: '#1565c0',
                                        }
                                    }}
                                >
                                    Legg ut ledig skift
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/* AI Skiftplanlegging - Integrated with calendar */}
                    <Box sx={{ 
                        p: 4, 
                        backgroundColor: '#ffffff',
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16
                    }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#black' }}>
                                        AI Skiftplanlegging
                                    </Typography>
                                </Box>
                                
                                {/* Månedlig generering */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 3, 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    mb: 3,
                                    p: 3,
                                    bgcolor: 'white',
                                    borderRadius: 2,
                                    border: '1px solid rgba(102, 126, 234, 0.1)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                                }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 1,
                                        minWidth: 140 
                                    }}>
                                        <Typography variant="subtitle1" fontWeight="600" color="text.primary">
                                            Månedlig:
                                        </Typography>
                                    </Box>
                                    <TextField
                                        type="month"
                                        value={selectedMonth.toISOString().slice(0, 7)}
                                        onChange={handleMonthChange}
                                        size="small"
                                        sx={{ 
                                            minWidth: 180,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(102, 126, 234, 0.3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(102, 126, 234, 0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#667eea',
                                                },
                                            }
                                        }}
                                    />
                                    
                                    <Button
                                        variant="contained"
                                        onClick={handleAiGenerateSchedule}
                                        disabled={isGeneratingSchedule}
                                        sx={{
                                            backgroundColor: '#2563eb',
                                            '&:hover': { backgroundColor: '#1d4ed8' },
                                            '&:disabled': { backgroundColor: '#b0b7c4' },
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            boxShadow: 'none',
                                            ml: 'auto'
                                        }}
                                    >
                                        {isGeneratingSchedule ? (
                                            <>
                                                <CircularProgress size={20} sx={{ ml: 70, color: 'white' }} />
                                                Genererer...
                                            </>
                                        ) : (
                                            '+ Generer månedlig plan'
                                        )}
                                    </Button>
                                </Box>

                                {/* Ukentlig generering */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 3, 
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 3,
                                    bgcolor: 'white',
                                    borderRadius: 2,
                                    border: '1px solid rgba(102, 126, 234, 0.1)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                                }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 1,
                                        minWidth: 140 
                                    }}>
                                        <Typography variant="subtitle1" fontWeight="600" color="text.primary">
                                            Ukentlig:
                                        </Typography>
                                    </Box>
                                    <TextField
                                        type="date"
                                        value={selectedWeekStart.toISOString().split('T')[0]}
                                        onChange={handleWeekChange}
                                        size="small"
                                        sx={{ 
                                            minWidth: 180,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(102, 126, 234, 0.3)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(102, 126, 234, 0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#667eea',
                                                },
                                            }
                                        }}
                                        inputProps={{
                                            min: '2020-01-01',
                                            max: '2030-12-31'
                                        }}
                                    />
                                    
                                    <Button
                                        variant="contained"
                                        onClick={handleAiGenerateWeeklySchedule}
                                        disabled={isGeneratingWeeklySchedule}
                                        sx={{
                                            backgroundColor: '#2563eb',
                                            '&:hover': { backgroundColor: '#1d4ed8' },
                                            '&:disabled': { backgroundColor: '#b0b7c4' },
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            boxShadow: 'none',
                                            ml: 'auto'
                                        }}
                                    >
                                        {isGeneratingWeeklySchedule ? (
                                            <>
                                                <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                                                Genererer...
                                            </>
                                        ) : (
                                            '+ Generer ukentlig plan'
                                        )}
                                    </Button>
                                </Box>
                            </Box>

                    {/* ← Oppdater AI Generert Skiftplan Visning */}
                    {aiGeneratedSchedule && (
                        <Box sx={{ 
                            mb: 3, 
                            p: 3, 
                            bgcolor: 'background.paper', 
                            borderRadius: 2,
                            border: '2px solid #667eea',
                            boxShadow: 3
                        }}>
                            <Typography variant="h5" sx={{ mb: 2, color: '#667eea' }}>
                                AI-generert Skiftplan for {aiGeneratedSchedule.month}
                            </Typography>
                            
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Genererte Skift ({aiGeneratedSchedule.shifts?.length || 0})
                                </Typography>
                                
                                {aiGeneratedSchedule.shifts && aiGeneratedSchedule.shifts.length > 0 ? (
                                    <Box sx={{ 
                                        maxHeight: 400, 
                                        overflow: 'auto',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1
                                    }}>
                                        <Box sx={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                            bgcolor: 'grey.100',
                                            p: 1,
                                            fontWeight: 'bold'
                                        }}>
                                            <Box>Ansatt</Box>
                                            <Box>Dato</Box>
                                            <Box>Tid</Box>
                                            <Box>Skift-type</Box>
                                            <Box>Timer</Box>
                                        </Box>
                                        
                                        {aiGeneratedSchedule.shifts.map((shift: any, index: number) => (
                                            <Box key={index} sx={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                                p: 1,
                                                borderBottom: '1px solid #e0e0e0',
                                                '&:hover': { bgcolor: 'grey.50' }
                                            }}>
                                                <Box>{shift.employeeName}</Box>
                                                <Box>{shift.date}</Box>
                                                <Box>{shift.startTime} - {shift.endTime}</Box>
                                                <Box>{shift.shiftType}</Box>
                                                <Box>{shift.hours}t</Box>
                                            </Box>
                                        ))}
                                    </Box>
                                ) : (
                                    <Typography color="text.secondary">
                                        Ingen skift generert ennå. Prøv å generere på nytt.
                                    </Typography>
                                )}
                            </Box>

                            {/* ← Godkjenning/Forkast Knapper */}
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="large"
                                    onClick={handleRejectAiSchedule}
                                    sx={{ px: 4, py: 1.5 }}
                                >
                                    ❌ Forkast AI-plan
                                </Button>
                                
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleApproveAiSchedule}
                                    sx={{ 
                                        px: 4, 
                                        py: 1.5,
                                        backgroundColor: '#667eea',
                                        '&:hover': {
                                            backgroundColor: '#5a6fd8',
                                        }
                                    }}
                                >
                                    ✅ Godkjenn og Bruk AI-plan
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Layout>
    )
}

export default SkiftPage
