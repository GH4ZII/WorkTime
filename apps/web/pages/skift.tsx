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
    Refresh as RefreshIcon
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
    userId: string
    date: string
    startTime: string
    endTime: string
    location?: string
    notes?: string
    createdBy: string
}

const ShiftPage: NextPage = () => {
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

    useEffect(() => {
        fetchEmployees()
        fetchShifts()
        
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
        
        const startDateTime = new Date(`${form.date}T${form.startTime}`).toISOString()
        const endDateTime = new Date(`${form.date}T${form.endTime}`).toISOString()
        
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

        const startDateTime = new Date(`${editForm.date}T${editForm.startTime}`).toISOString()
        const endDateTime = new Date(`${editForm.date}T${editForm.endTime}`).toISOString()
        
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
        const shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
        const startTime = new Date(shift.startTime).toTimeString().slice(0, 5)
        const endTime = new Date(shift.endTime).toTimeString().slice(0, 5)
        
        setEditingShift(shift)
        setEditForm({
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

    // Hent ukedager for gjeldende uke - fikset timezone-problem
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
            const shiftDate = new Date(shift.startTime)
            const normalizedShiftDate = new Date(shiftDate)
            normalizedShiftDate.setHours(0, 0, 0, 0)
            
            return shift.userId === employeeId && normalizedShiftDate.getTime() === normalizedDate.getTime()
        })
    }

    // Hent alle skift for en spesifikk dato, sortert etter starttid
    const getShiftsForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0]
        return shifts
            .filter(shift => {
                const shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
                return shiftDate === dateStr
            })
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    }

    // Hent alle unike starttider for en dato (for å lage rader)
    const getUniqueStartTimes = (date: Date) => {
        const shiftsForDate = getShiftsForDate(date)
        const startTimes = shiftsForDate.map(shift => {
            const startTime = new Date(shift.startTime)
            return {
                time: startTime,
                timeString: startTime.toTimeString().slice(0, 5), // HH:MM format
                timestamp: startTime.getTime()
            }
        })
        
        // Fjern duplikater og sorter
        const uniqueTimes = startTimes.filter((time, index, self) => 
            index === self.findIndex(t => t.timeString === time.timeString)
        ).sort((a, b) => a.timestamp - b.timestamp)
        
        return uniqueTimes
    }

    // Hent skift for spesifikk ansatt, dato og starttid
    const getShiftForEmployeeDateAndTime = (employeeId: string, date: Date, startTime: string) => {
        const dateStr = date.toISOString().split('T')[0]
        return shifts.find(shift => {
            const shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
            const shiftStartTime = new Date(shift.startTime).toTimeString().slice(0, 5)
            return shift.userId === employeeId && shiftDate === dateStr && shiftStartTime === startTime
        })
    }

    // Hent alle ansatte som har skift på en spesifikk dato og starttid
    const getEmployeesWithShiftAtTime = (date: Date, startTime: string) => {
        const dateStr = date.toISOString().split('T')[0]
        return shifts
            .filter(shift => {
                const shiftDate = new Date(shift.startTime).toISOString().split('T')[0]
                const shiftStartTime = new Date(shift.startTime).toTimeString().slice(0, 5)
                return shiftDate === dateStr && shiftStartTime === startTime
            })
            .map(shift => shift.userId)
    }

    // Formater tid
    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })
    }

    // Beregn varighet
    const getDuration = (startTime: string, endTime: string) => {
        const start = new Date(startTime)
        const end = new Date(endTime)
        const diffMs = end.getTime() - start.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        return `${diffHours} hrs.`
    }

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

    const weekDays = getWeekDays()

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

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                            Shift Board
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Administrer skift og arbeidstider
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setShowForm(true)}
                        sx={{
                            py: 1.5,
                            px: 3,
                            borderRadius: 2,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        +Add Employee
                    </Button>
                </Box>

                {/* Shift Board */}
                <Card elevation={2}>
                    <CardContent sx={{ p: 0 }}>
                        {/* Date Navigation */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            p: 3,
                            borderBottom: '1px solid #e0e0e0'
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
                                <IconButton onClick={goToToday}>
                                    <CalendarIcon />
                                </IconButton>
                                <IconButton onClick={fetchShifts}>
                                    <RefreshIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Dynamic Shift Board Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ 
                                            fontWeight: 'bold', 
                                            minWidth: 200,
                                            backgroundColor: '#f8f9fa',
                                            borderRight: '1px solid #e0e0e0'
                                        }}>
                                            Employee Name
                                        </TableCell>
                                        {weekDays.map((day, index) => (
                                            <TableCell 
                                                key={index}
                                                align="center"
                                                sx={{ 
                                                    fontWeight: 'bold',
                                                    minWidth: 120,
                                                    backgroundColor: '#f8f9fa',
                                                    borderRight: index < 6 ? '1px solid #e0e0e0' : 'none'
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
                                                        bgcolor: 'primary.main',
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
                                                                backgroundColor: '#e3f2fd',
                                                                borderRadius: 1,
                                                                p: 1,
                                                                border: '1px solid #bbdefb'
                                                            }}>
                                                                <Typography variant="body2" fontWeight="medium">
                                                                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {getDuration(shift.startTime, shift.endTime)}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', gap: 0.5, mt: 1, justifyContent: 'center' }}>
                                                                    <Tooltip title="Rediger">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => startEdit(shift)}
                                                                            sx={{ 
                                                                                color: 'primary.main',
                                                                                width: 20,
                                                                                height: 20
                                                                            }}
                                                                        >
                                                                            <EditIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="Slett">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleDelete(shift.id)}
                                                                            sx={{ 
                                                                                color: 'error.main',
                                                                                width: 20,
                                                                                height: 20
                                                                            }}
                                                                        >
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            </Box>
                                                        ) : (
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                startIcon={<AddIcon />}
                                                                onClick={() => handleAddShiftClick(employee.id, day)}
                                                                sx={{
                                                                    minWidth: 'auto',
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: '50%',
                                                                    p: 0
                                                                }}
                                                            />
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
                                    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
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
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                                    }
                                }}
                            >
                                Oppdater skift
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </Layout>
    )
}

export default ShiftPage
