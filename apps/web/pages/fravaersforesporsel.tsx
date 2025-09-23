// pages/fravaersforesporsel.tsx
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
    Chip,
    Avatar,
    Grid,
    Divider,
    Alert,
    CircularProgress,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    Event as EventIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    CalendarToday as CalendarIcon,
    AccessTime as TimeIcon,
    CheckCircleOutline as CheckCircleIcon,
    HighlightOff as CancelIcon,
    Search as SearchIcon,
    Clear as ClearIcon
} from '@mui/icons-material';

interface TimeOffRequest {
    id: string
    userId: string
    fromDate: string
    toDate: string
    type: 'VACATION' | 'SICK' | 'OTHER'
    reason?: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    isHidden?: boolean
    createdAt: string
    updatedAt?: string
}

interface Employee {
    id: string
    name: string
}

const FravaersforesporselPage: NextPage = () => {
    const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchTimeOffRequests()
        fetchEmployees()
    }, [])

    const fetchTimeOffRequests = async () => {
        try {
            const response = await axios.get('http://localhost:3001/time-off-requests', { withCredentials: true })
            setTimeOffRequests(response.data)
        } catch (err: any) {
            setError('Kunne ikke hente fraværsforespørsler')
        }
    }

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users', { withCredentials: true })
            setEmployees(response.data)
        } catch (err: any) {
            setError('Kunne ikke hente ansatte')
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (requestId: string) => {
        try {
            await axios.patch(`http://localhost:3001/time-off-requests/${requestId}/approve`, {}, { withCredentials: true })
            setSuccess('Forespørsel godkjent!')
            fetchTimeOffRequests()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError('Kunne ikke godkjenne forespørsel')
        }
    }

    const handleReject = async (requestId: string) => {
        try {
            await axios.patch(`http://localhost:3001/time-off-requests/${requestId}/reject`, {}, { withCredentials: true })
            setSuccess('Forespørsel avvist!')
            fetchTimeOffRequests()
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError('Kunne ikke avvise forespørsel')
        }
    }

    const handleRemove = async (requestId: string) => {
        try {
            // Send forespørsel til backend for å markere som fjernet
            await axios.patch(`http://localhost:3001/time-off-requests/${requestId}/remove`, {}, {
                withCredentials: true
            });
            
            // Fjern fra lokalt state
            setTimeOffRequests(prev => prev.filter(req => req.id !== requestId));
            setSuccess('Forespørsel fjernet fra skjermen!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            // Hvis backend ikke støtter remove, bare fjern fra frontend
            setTimeOffRequests(prev => prev.filter(req => req.id !== requestId));
            setSuccess('Forespørsel fjernet fra skjermen!');
            setTimeout(() => setSuccess(null), 3000);
        }
    }

    // Filtrer forespørsler etter status og skjul skjulte
    const matchesSearch = (req: TimeOffRequest) => {
        const who = getUserName(req.userId).toLowerCase()
        const reason = (req.reason || '').toLowerCase()
        return who.includes(search.toLowerCase()) || reason.includes(search.toLowerCase())
    }
    const pendingRequests = timeOffRequests.filter(req => req.status === 'PENDING' && !req.isHidden && matchesSearch(req))
    const approvedRequests = timeOffRequests.filter(req => req.status === 'APPROVED' && !req.isHidden && matchesSearch(req))
    const rejectedRequests = timeOffRequests.filter(req => req.status === 'REJECTED' && !req.isHidden && matchesSearch(req))

    // Hjelpefunksjoner
    const getUserName = (userId: string) => {
        const employee = employees.find(emp => emp.id === userId)
        return employee?.name || 'Ukjent'
    }

    const getRequestTypeLabel = (type: string) => {
        switch (type) {
            case 'VACATION': return 'Ferie'
            case 'SICK': return 'Syk'
            case 'OTHER': return 'Annet'
            default: return type
        }
    }

    const getRequestTypeColor = (type: string) => {
        switch (type) {
            case 'VACATION': return 'success'
            case 'SICK': return 'error'
            case 'OTHER': return 'warning'
            default: return 'default'
        }
    }

    const getRequestTypeIcon = (type: string) => {
        switch (type) {
            case 'VACATION': return <EventIcon />
            case 'SICK': return <EventIcon />
            case 'OTHER': return <EventIcon />
            default: return <EventIcon />
        }
    }

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'PENDING': return 'Venter'
            case 'APPROVED': return 'Godkjent'
            case 'REJECTED': return 'Avvist'
            default: return status
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'warning'
            case 'APPROVED': return 'success'
            case 'REJECTED': return 'error'
            default: return 'default'
        }
    }

    const calculateDuration = (fromDate: string, toDate: string) => {
        const from = new Date(fromDate)
        const to = new Date(toDate)
        const diffTime = Math.abs(to.getTime() - from.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        return diffDays
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('nb-NO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('nb-NO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                    <Typography variant="h4" fontWeight="bold">Fraværsforespørsler</Typography>
                    <TextField
                        placeholder="Søk"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            )
                        }}
                        sx={{ width: { xs: 180, sm: 260, md: 320 }, '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: 'grey.50' } }}
                    />
                </Box>

                {/* Ventende forespørsler */}
                <Box sx={{ mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3, bgcolor: 'background.paper', boxShadow: '0 1px 3px rgba(16,24,40,0.08)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2.5, borderBottom: '1px solid', borderColor: 'divider', gap: 1.5 }}>
                        <EventIcon sx={{ color: 'warning.main' }} />
                        <Typography variant="h6" fontWeight="bold">Ventende forespørsler</Typography>
                        <Chip label={pendingRequests.length} size="small" sx={{ ml: 1, bgcolor: 'grey.100' }} />
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                        
                        {pendingRequests.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Ingen ventende forespørsler
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {pendingRequests.map((request) => {
                                    const duration = calculateDuration(request.fromDate, request.toDate);
                                    
                                    return (
                                        <Grid item xs={12} md={6} lg={4} key={request.id}>
                                            <Card 
                                                elevation={2}
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
                                                                width: 48,
                                                                height: 48
                                                            }}
                                                        >
                                                            {getUserName(request.userId).charAt(0)}
                                                        </Avatar>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="h6" fontWeight="bold">
                                                                {getUserName(request.userId)}
                                                            </Typography>
                                                            <Chip
                                                                icon={getRequestTypeIcon(request.type)}
                                                                label={getRequestTypeLabel(request.type)}
                                                                color={getRequestTypeColor(request.type) as any}
                                                                size="small"
                                                                sx={{ mt: 0.5 }}
                                                            />
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Chip
                                                                label={getStatusDisplay(request.status)}
                                                                color={getStatusColor(request.status) as any}
                                                                variant={request.status === 'PENDING' ? 'filled' : 'outlined'}
                                                                size="small"
                                                            />
                                                            <Tooltip title="Fjern fra skjermen">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleRemove(request.id)}
                                                                    sx={{ 
                                                                        color: 'text.secondary',
                                                                        '&:hover': { color: 'error.main' }
                                                                    }}
                                                                >
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>

                                                    <Divider sx={{ my: 2 }} />

                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <CalendarIcon fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                Fra: {formatDate(request.fromDate)}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <CalendarIcon fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                Til: {formatDate(request.toDate)}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <TimeIcon fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                Varighet: {duration} dag{duration !== 1 ? 'er' : ''}
                                                            </Typography>
                                                        </Box>

                                                        {request.reason && (
                                                            <Box sx={{ mt: 1 }}>
                                                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                                    "{request.reason}"
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    {request.status === 'PENDING' && (
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                size="small"
                                                                startIcon={<CloseIcon />}
                                                                onClick={() => handleReject(request.id)}
                                                                sx={{ flex: 1 }}
                                                            >
                                                                Avvis
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                size="small"
                                                                startIcon={<CheckIcon />}
                                                                onClick={() => handleApprove(request.id)}
                                                                sx={{ 
                                                                    flex: 1,
                                                                    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                                                                    '&:hover': {
                                                                        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                                                                    }
                                                                }}
                                                            >
                                                                Godkjenn
                                                            </Button>
                                                        </Box>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </Box>
                </Box>

                {/* Arkiv - Godkjente forespørsler */}
                <Box sx={{ mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3, bgcolor: 'background.paper', boxShadow: '0 1px 3px rgba(16,24,40,0.08)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2.5, borderBottom: '1px solid', borderColor: 'divider', gap: 1.5 }}>
                        <CheckCircleIcon sx={{ color: 'success.main' }} />
                        <Typography variant="h6" fontWeight="bold">Godkjente forespørsler</Typography>
                        <Chip label={approvedRequests.length} size="small" sx={{ ml: 1, bgcolor: 'grey.100' }} />
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                        
                        {approvedRequests.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Ingen godkjente forespørsler
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {approvedRequests.map((request) => (
                                    <Grid item xs={12} md={6} lg={4} key={request.id}>
                                        <Card 
                                            elevation={1}
                                            sx={{
                                                height: '100%',
                                                border: '2px solid',
                                                borderColor: 'success.main',
                                                backgroundColor: '#f8fff8'
                                            }}
                                        >
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                                                        <Typography variant="h6" fontWeight="bold" color="success.main">
                                                            Godkjent
                                                        </Typography>
                                                    </Box>
                                                    <Tooltip title="Fjern fra skjermen">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleRemove(request.id)}
                                                            sx={{ 
                                                                color: 'text.secondary',
                                                                '&:hover': { color: 'error.main' }
                                                            }}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                                
                                                {/* Ansatt info */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                        {getUserName(request.userId).charAt(0)}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="bold">
                                                            {getUserName(request.userId)}
                                                        </Typography>
                                                        <Chip
                                                            label={getRequestTypeLabel(request.type)}
                                                            color={getRequestTypeColor(request.type) as any}
                                                            size="small"
                                                        />
                                                    </Box>
                                                </Box>

                                                {/* Datoer */}
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Fra:</strong> {formatDate(request.fromDate)}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Til:</strong> {formatDate(request.toDate)}
                                                    </Typography>
                                                </Box>

                                                {/* Grunn */}
                                                {request.reason && (
                                                    <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Grunn:</strong> {request.reason}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {/* Godkjent dato */}
                                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                                    <Typography variant="caption" color="success.main">
                                                        Godkjent: {formatDateTime(request.updatedAt || request.createdAt)}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>

                {/* Arkiv - Avviste forespørsler */}
                <Box sx={{ mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3, bgcolor: 'background.paper', boxShadow: '0 1px 3px rgba(16,24,40,0.08)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2.5, borderBottom: '1px solid', borderColor: 'divider', gap: 1.5 }}>
                        <CancelIcon sx={{ color: 'error.main' }} />
                        <Typography variant="h6" fontWeight="bold">Avviste forespørsler</Typography>
                        <Chip label={rejectedRequests.length} size="small" sx={{ ml: 1, bgcolor: 'grey.100' }} />
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                        
                        {rejectedRequests.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Ingen avviste forespørsler
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {rejectedRequests.map((request) => (
                                    <Grid item xs={12} md={6} lg={4} key={request.id}>
                                        <Card 
                                            elevation={1}
                                            sx={{
                                                height: '100%',
                                                border: '2px solid',
                                                borderColor: 'error.main',
                                                backgroundColor: '#fff8f8'
                                            }}
                                        >
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <CancelIcon sx={{ color: 'error.main', mr: 1 }} />
                                                        <Typography variant="h6" fontWeight="bold" color="error.main">
                                                            Avvist
                                                        </Typography>
                                                    </Box>
                                                    <Tooltip title="Fjern fra skjermen">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleRemove(request.id)}
                                                            sx={{ 
                                                                color: 'text.secondary',
                                                                '&:hover': { color: 'error.main' }
                                                            }}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                                
                                                {/* Ansatt info */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                        {getUserName(request.userId).charAt(0)}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="bold">
                                                            {getUserName(request.userId)}
                                                        </Typography>
                                                        <Chip
                                                            label={getRequestTypeLabel(request.type)}
                                                            color={getRequestTypeColor(request.type) as any}
                                                            size="small"
                                                        />
                                                    </Box>
                                                </Box>

                                                {/* Datoer */}
                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Fra:</strong> {formatDate(request.fromDate)}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <strong>Til:</strong> {formatDate(request.toDate)}
                                                    </Typography>
                                                </Box>

                                                {/* Grunn */}
                                                {request.reason && (
                                                    <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Grunn:</strong> {request.reason}
                                                        </Typography>
                                                    </Box>
                                                )}

                                                {/* Avvist dato */}
                                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                                    <Typography variant="caption" color="error.main">
                                                        Avvist: {formatDateTime(request.updatedAt || request.createdAt)}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
}

export default FravaersforesporselPage;


