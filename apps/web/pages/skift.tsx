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
    Tabs,
    Tab,
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
    Event as EventIcon
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

type TabType = 'today' | 'week' | 'month'

const ShiftPage: NextPage = () => {
    // Boolean - for å vise/skjule skjemaet
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    // Array - for å lagre ansatte fra API
    const [employees, setEmployees] = useState<Employee[]>([])
    const [shifts, setShifts] = useState<Shift[]>([])

    // Interface - for å lagre skjema-data
    const [form, setForm] = useState<ShiftPayload>({
        userId: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        createdBy: 'admin',
    })

    // State for redigering
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

    // Kalender state
    const [activeTab, setActiveTab] = useState<TabType>('today')
    const [selectedDate, setSelectedDate] = useState(new Date())

    // String | null - for feilmeldinger
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchEmployees()
        fetchShifts()
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

    // Filtrer skift basert på aktiv tab
    const getFilteredShifts = () => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

        return shifts.filter(shift => {
            const shiftDate = new Date(shift.startTime)
            
            switch (activeTab) {
                case 'today':
                    return shiftDate >= today && shiftDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
                case 'week':
                    return shiftDate >= weekAgo
                case 'month':
                    return shiftDate >= monthAgo
                default:
                    return true
            }
        }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    }

    // Hjelpefunksjoner for formatering
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('nb-NO', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })
    }

    const getDuration = (startTime: string, endTime: string) => {
        const start = new Date(startTime)
        const end = new Date(endTime)
        const diffMs = end.getTime() - start.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
        return `${diffHours}t ${diffMinutes}m`
    }

    const getEmployeeName = (userId: string) => {
        const employee = employees.find(emp => emp.id === userId)
        return employee?.name || 'Ukjent'
    }

    const getTabIcon = (tab: TabType) => {
        switch (tab) {
            case 'today':
                return <TodayIcon />
            case 'week':
                return <DateRangeIcon />
            case 'month':
                return <EventIcon />
            default:
                return <TodayIcon />
        }
    }

    const getTabLabel = (tab: TabType) => {
        switch (tab) {
            case 'today':
                return 'I dag'
            case 'week':
                return 'Siste uke'
            case 'month':
                return 'Siste måned'
            default:
                return 'I dag'
        }
    }

    const filteredShifts = getFilteredShifts()

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
                            Skift Administrasjon
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
                        Opprett nytt skift
                    </Button>
                </Box>

                {/* Skjema for nytt skift */}
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

                {/* Kalender med tabs */}
                <Card elevation={2}>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs 
                                value={activeTab} 
                                onChange={(_, newValue) => setActiveTab(newValue)}
                                variant="fullWidth"
                            >
                                {(['today', 'week', 'month'] as TabType[]).map((tab) => (
                                    <Tab
                                        key={tab}
                                        value={tab}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {getTabIcon(tab)}
                                                {getTabLabel(tab)}
                                                <Badge 
                                                    badgeContent={tab === 'today' ? filteredShifts.length : undefined} 
                                                    color="primary"
                                                />
                                            </Box>
                                        }
                                        sx={{ py: 2 }}
                                    />
                                ))}
                            </Tabs>
                        </Box>

                        <Box sx={{ p: 3 }}>
                            {filteredShifts.length === 0 ? (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <ScheduleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        Ingen skift funnet
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ingen skift funnet for valgt periode
                                    </Typography>
                                </Box>
                            ) : (
                                <Grid container spacing={3}>
                                    {filteredShifts.map(shift => (
                                        <Grid item xs={12} sm={6} lg={4} key={shift.id}>
                                            <Card 
                                                elevation={1}
                                                sx={{
                                                    height: '100%',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                    }
                                                }}
                                            >
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Avatar 
                                                            sx={{ 
                                                                bgcolor: 'primary.main', 
                                                                mr: 2,
                                                                width: 40,
                                                                height: 40
                                                            }}
                                                        >
                                                            {getEmployeeName(shift.userId).charAt(0)}
                                                        </Avatar>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="h6" fontWeight="bold">
                                                                {getEmployeeName(shift.userId)}
                                                            </Typography>
                                                            <Chip
                                                                label={getDuration(shift.startTime, shift.endTime)}
                                                                color="primary"
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                            <Tooltip title="Rediger">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => startEdit(shift)}
                                                                    sx={{ color: 'primary.main' }}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Slett">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleDelete(shift.id)}
                                                                    sx={{ color: 'error.main' }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>

                                                    <Divider sx={{ my: 2 }} />

                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <CalendarIcon fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {formatDateTime(shift.startTime)}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <TimeIcon fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        {shift.location && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <LocationIcon fontSize="small" color="action" />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {shift.location}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        
                                                        {shift.notes && (
                                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                                                <NotesIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {shift.notes}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    )
}

export default ShiftPage
