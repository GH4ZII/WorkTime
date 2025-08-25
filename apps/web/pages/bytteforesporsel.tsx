import React, { useState, useEffect } from "react";
import {NextPage} from "next";
import { Layout } from '../components/Layout';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Avatar,
    IconButton,
    Alert,
    CircularProgress,
    Grid,
    Divider,
    Tooltip,
    Paper
} from '@mui/material';
import {
    SwapHoriz as SwapIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    AccessTime as TimeIcon,
    CalendarToday as CalendarIcon,
    ArrowForward as ArrowIcon,
    SwapHoriz as SwapHorizIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Clear as ClearIcon
} from '@mui/icons-material';

interface User {
    id: string;
    name: string;
}

interface Shift {
    id: string;
    startTime: string;
    endTime: string;
    user: User;
}

interface ShiftSwapRequest {
    id: string;
    requestedById: string;
    fromShiftId: string;
    swapType: string;
    swapWithId?: string;
    toShiftId?: string;
    status?: string;
    fromShift?: Shift;
    toShift?: Shift;
    reason?: string;
    isHidden?: boolean;
    requestedAt: string;
    updatedAt: string;
    location?: string;
}

const ShiftSwapPage: NextPage = () => {
    const [swapRequests, setSwapRequests] = useState<ShiftSwapRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [swapResponse, usersResponse, shiftsResponse] = await Promise.all([
                axios.get<ShiftSwapRequest[]>('http://localhost:3001/shift-swap-requests', {
                    withCredentials: true
                }),
                axios.get<User[]>('http://localhost:3001/users', {
                    withCredentials: true
                }),
                axios.get<Shift[]>('http://localhost:3001/shifts', {
                    withCredentials: true
                })
            ]);
            
            setSwapRequests(swapResponse.data);
            setUsers(usersResponse.data);
            setShifts(shiftsResponse.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserName = (userId: string) => {        
        const user = users.find(u => u.id === userId);
        if (!user) {
            return 'Ukjent bruker';
        }
        
        return user.name;
    };

    const getShiftInfo = (shiftId: string) => {
        const shift = shifts.find(s => s.id === shiftId);
        if (!shift) return null;
        
        const startDate = new Date(shift.startTime);
        const endDate = new Date(shift.endTime);
        
        return {
            userName: getUserName(shift.user.id),
            startTime: startDate.toLocaleString('nb-NO', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            endTime: endDate.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }),
            duration: `${Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60))}t ${Math.floor(((endDate.getTime() - startDate.getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m`
        };
    };

    const getRequestTitle = (request: ShiftSwapRequest) => {
        const fromShiftInfo = getShiftInfo(request.fromShiftId);
        if (!fromShiftInfo) return 'Ukjent skift';
        
        if (request.swapType === 'SWAP' && request.toShiftId) {
            const toShiftInfo = getShiftInfo(request.toShiftId);
            if (!toShiftInfo) return 'Ukjent skift';
            
            return `${fromShiftInfo.userName} ↔ ${toShiftInfo.userName}`;
        } else {
            return `${fromShiftInfo.userName} gir bort vakt`;
        }
    };

    const getRequestDescription = (request: ShiftSwapRequest) => {
        const fromShiftInfo = getShiftInfo(request.fromShiftId);
        if (!fromShiftInfo) return 'Ukjent skift';
        
        if (request.swapType === 'SWAP' && request.toShiftId) {
            const toShiftInfo = getShiftInfo(request.toShiftId);
            if (!toShiftInfo) return 'Ukjent skift';
            
            return `${fromShiftInfo.userName} ønsker å bytte sitt skift (${fromShiftInfo.startTime}) med ${toShiftInfo.userName}s skift (${toShiftInfo.startTime})`;
        } else {
            return `${fromShiftInfo.userName} ønsker å gi bort sitt skift (${fromShiftInfo.startTime})`;
        }
    };

    const handleApprove = async (requestId: string) => {
        try {
            await axios.post(`http://localhost:3001/shift-swap-requests/${requestId}/approve`, {}, {
                withCredentials: true
            });
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    }

    const handleReject = async (requestId: string) => {
        try {
            await axios.post(`http://localhost:3001/shift-swap-requests/${requestId}/reject`, {}, {
                withCredentials: true
            });
            setSuccess('Forespørsel avvist!');
            fetchData();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message);
        }
    }

    const handleRemove = async (requestId: string) => {
        try {
            // Send forespørsel til backend for å markere som fjernet
            await axios.patch(`http://localhost:3001/shift-swap-requests/${requestId}/remove`, {}, {
                withCredentials: true
            });
            
            // Fjern fra lokalt state
            setSwapRequests(prev => prev.filter(req => req.id !== requestId));
            setSuccess('Forespørsel fjernet fra skjermen!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            // Hvis backend ikke støtter remove, bare fjern fra frontend
            setSwapRequests(prev => prev.filter(req => req.id !== requestId));
            setSuccess('Forespørsel fjernet fra skjermen!');
            setTimeout(() => setSuccess(null), 3000);
        }
    }

    const getStatusDisplay = (status?: string) => {
        switch (status) {
            case 'PENDING':
                return 'Venter';
            case 'APPROVED':
                return 'Godkjent';
            case 'REJECTED':
                return 'Avvist';
            default:
                return 'Venter';
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'PENDING':
                return 'warning';
            case 'APPROVED':
                return 'success';
            case 'REJECTED':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDateTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('nb-NO', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    // Filtrer forespørsler etter status og skjul skjulte
    const pendingRequests = swapRequests.filter(req => req.status === 'PENDING' && !req.isHidden)
    const approvedRequests = swapRequests.filter(req => req.status === 'APPROVED' && !req.isHidden)
    const rejectedRequests = swapRequests.filter(req => req.status === 'REJECTED' && !req.isHidden)

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


                {/* Ventende forespørsler */}
                <Card elevation={2} sx={{ mb: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <SwapHorizIcon sx={{ mr: 1, color: 'warning.main' }} />
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                Ventende forespørsler ({pendingRequests.length})
                            </Typography>
                        </Box>
                        
                        {pendingRequests.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Ingen ventende forespørsler
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {pendingRequests.map(request => {
                                    const fromShiftInfo = getShiftInfo(request.fromShiftId);
                                    const toShiftInfo = request.toShiftId ? getShiftInfo(request.toShiftId) : null;
                                    
                                    return (
                                        <Grid item xs={12} key={request.id}>
                                            <Card 
                                                elevation={2}
                                                sx={{
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                    }
                                                }}
                                            >
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
                                                                {getRequestTitle(request)}
                                                            </Typography>
                                                            <Typography variant="body1" color="text.secondary">
                                                                {getRequestDescription(request)}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Chip
                                                                label={getStatusDisplay(request.status)}
                                                                color={getStatusColor(request.status) as any}
                                                                variant={request.status === 'PENDING' ? 'filled' : 'outlined'}
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

                                                    <Divider sx={{ my: 3 }} />

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                                        {/* Fra skift */}
                                                        <Card 
                                                            elevation={1}
                                                            sx={{ 
                                                                flex: 1,
                                                                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                                                            }}
                                                        >
                                                            <CardContent>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                    <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 32, height: 32 }}>
                                                                        {fromShiftInfo?.userName.charAt(0) || '?'}
                                                                    </Avatar>
                                                                    <Typography variant="h6" fontWeight="bold">
                                                                        Fra skift
                                                                    </Typography>
                                                                </Box>
                                                                {fromShiftInfo ? (
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                            <PersonIcon fontSize="small" color="action" />
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                {fromShiftInfo.userName}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                            <CalendarIcon fontSize="small" color="action" />
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                {fromShiftInfo.startTime}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                            <TimeIcon fontSize="small" color="action" />
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                {fromShiftInfo.startTime.split(',')[1]} - {fromShiftInfo.endTime}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Chip
                                                                            label={fromShiftInfo.duration}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            color="primary"
                                                                        />
                                                                    </Box>
                                                                ) : (
                                                                    <Typography color="error" variant="body2">
                                                                        Skift ikke funnet
                                                                    </Typography>
                                                                )}
                                                            </CardContent>
                                                        </Card>

                                                        {/* Pil for bytte */}
                                                        {request.swapType === 'SWAP' && toShiftInfo && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                                                                <ArrowIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                                                            </Box>
                                                        )}

                                                        {/* Til skift - Vis for både SWAP og GIVE_AWAY */}
                                                        {(request.swapType === 'SWAP' && toShiftInfo) || request.swapType === 'GIVE_AWAY' ? (
                                                            <Card 
                                                                elevation={1}
                                                                sx={{ 
                                                                    flex: 1,
                                                                    background: request.swapType === 'GIVE_AWAY' 
                                                                        ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' 
                                                                        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
                                                                }}
                                                            >
                                                                <CardContent>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                        <Avatar sx={{ mr: 1, bgcolor: request.swapType === 'GIVE_AWAY' ? 'success.main' : 'secondary.main', width: 32, height: 32 }}>
                                                                            {request.swapType === 'GIVE_AWAY' 
                                                                                ? getUserName(request.swapWithId)?.charAt(0) || '?'
                                                                                : toShiftInfo?.userName.charAt(0) || '?'
                                                                            }
                                                                        </Avatar>
                                                                        <Typography variant="h6" fontWeight="bold">
                                                                            {request.swapType === 'GIVE_AWAY' ? 'Gir vakt til' : 'Til skift'}
                                                                        </Typography>
                                                                    </Box>
                                                                    
                                                                    {request.swapType === 'GIVE_AWAY' ? (
                                                                        // For GIVE_AWAY - vis hvem vakten skal gis til
                                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                <PersonIcon fontSize="small" color="action" />
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    {getUserName(request.swapWithId) || 'Ingen mottaker valgt'}
                                                                                </Typography>
                                                                            </Box>
                                                                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                                                Vakt gis bort uten bytte
                                                                            </Typography>                                  
                                                                        </Box>
                                                                    ) : (
                                                                        // For SWAP - vis skiftet som byttes til
                                                                        toShiftInfo && (
                                                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                    <PersonIcon fontSize="small" color="action" />
                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                        {toShiftInfo.userName}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                    <CalendarIcon fontSize="small" color="action" />
                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                        {toShiftInfo.startTime}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                    <TimeIcon fontSize="small" color="action" />
                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                        {toShiftInfo.startTime.split(',')[1]} - {toShiftInfo.endTime}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Chip
                                                                                    label={toShiftInfo.duration}
                                                                                    size="small"
                                                                                    variant="outlined"
                                                                                    color="secondary"
                                                                                />
                                                                            </Box>
                                                                        )
                                                                    )}
                                                                </CardContent>
                                                            </Card>
                                                        ) : null}
                                                    </Box>

                                                    {request.status === 'PENDING' && (
                                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                startIcon={<CloseIcon />}
                                                                onClick={() => handleReject(request.id)}
                                                                sx={{
                                                                    borderRadius: 2,
                                                                    px: 3,
                                                                    py: 1
                                                                }}
                                                            >
                                                                Avvis
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                startIcon={<CheckIcon />}
                                                                onClick={() => handleApprove(request.id)}
                                                                sx={{
                                                                    borderRadius: 2,
                                                                    px: 3,
                                                                    py: 1,
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
                    </CardContent>
                </Card>

                {/* Arkiv - Godkjente forespørsler */}
                <Card elevation={2} sx={{ mb: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <CheckCircleIcon sx={{ mr: 1, color: 'success.main' }} />
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                Godkjente forespørsler ({approvedRequests.length})
                            </Typography>
                        </Box>
                        
                        {approvedRequests.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Ingen godkjente forespørsler
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {approvedRequests.map((request) => {
                                    const fromShiftInfo = getShiftInfo(request.fromShiftId);
                                    const toShiftInfo = request.toShiftId ? getShiftInfo(request.toShiftId) : null;
                                    
                                    return (
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
                                                    
                                                    {/* Fra skift */}
                                                    <Card 
                                                        elevation={1}
                                                        sx={{ 
                                                            flex: 1,
                                                            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                                                            mb: 2
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 32, height: 32 }}>
                                                                    {fromShiftInfo?.userName.charAt(0) || '?'}
                                                                </Avatar>
                                                                <Typography variant="h6" fontWeight="bold">
                                                                    Fra skift
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {fromShiftInfo?.startTime ? formatDateTime(fromShiftInfo.startTime) : 'Ukjent tid'}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {fromShiftInfo?.location || 'Ingen lokasjon'}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Til skift (hvis SWAP) */}
                                                    {request.swapType === 'SWAP' && request.toShiftId && (
                                                        <Card 
                                                            elevation={1}
                                                            sx={{ 
                                                                flex: 1,
                                                                background: 'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)',
                                                                mb: 2
                                                            }}
                                                        >
                                                            <CardContent>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                    <Avatar sx={{ mr: 1, bgcolor: 'success.main', width: 32, height: 32 }}>
                                                                        {toShiftInfo?.userName.charAt(0) || '?'}
                                                                    </Avatar>
                                                                    <Typography variant="h6" fontWeight="bold">
                                                                        Til skift
                                                                    </Typography>
                                                                </Box>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {toShiftInfo?.startTime ? formatDateTime(toShiftInfo.startTime) : 'Ukjent tid'}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {toShiftInfo?.location || 'Ingen lokasjon'}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    )}

                                                    {/* Gir vakt til (hvis GIVE_AWAY) */}
                                                    {request.swapType === 'GIVE_AWAY' && request.swapWithId && (
                                                        <Card 
                                                            elevation={1}
                                                            sx={{ 
                                                                flex: 1,
                                                                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                                                                mb: 2
                                                            }}
                                                        >
                                                            <CardContent>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                    <Avatar sx={{ mr: 1, bgcolor: 'warning.main', width: 32, height: 32 }}>
                                                                        {getUserName(request.swapWithId).charAt(0)}
                                                                    </Avatar>
                                                                    <Typography variant="h6" fontWeight="bold">
                                                                        Gir vakt til
                                                                    </Typography>
                                                                </Box>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {getUserName(request.swapWithId)}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    )}

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
                                                            Godkjent: {formatDateTime(request.updatedAt || request.requestedAt)}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </CardContent>
                </Card>

                {/* Arkiv - Avviste forespørsler */}
                <Card elevation={2} sx={{ mb: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <CancelIcon sx={{ mr: 1, color: 'error.main' }} />
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                Avviste forespørsler ({rejectedRequests.length})
                            </Typography>
                        </Box>
                        
                        {rejectedRequests.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Ingen avviste forespørsler
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {rejectedRequests.map((request) => {
                                    const fromShiftInfo = getShiftInfo(request.fromShiftId);
                                    const toShiftInfo = request.toShiftId ? getShiftInfo(request.toShiftId) : null;
                                    
                                    return (
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
                                                    
                                                    {/* Samme innhold som godkjente, men med rød styling */}
                                                    {/* Fra skift */}
                                                    <Card 
                                                        elevation={1}
                                                        sx={{ 
                                                            flex: 1,
                                                            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                                                            mb: 2
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 32, height: 32 }}>
                                                                    {fromShiftInfo?.userName.charAt(0) || '?'}
                                                                </Avatar>
                                                                <Typography variant="h6" fontWeight="bold">
                                                                    Fra skift
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {fromShiftInfo?.startTime ? formatDateTime(fromShiftInfo.startTime) : 'Ukjent tid'}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {fromShiftInfo?.location || 'Ingen lokasjon'}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Til skift (hvis SWAP) */}
                                                    {request.swapType === 'SWAP' && request.toShiftId && (
                                                        <Card 
                                                            elevation={1}
                                                            sx={{ 
                                                                flex: 1,
                                                                background: 'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)',
                                                                mb: 2
                                                            }}
                                                        >
                                                            <CardContent>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                    <Avatar sx={{ mr: 1, bgcolor: 'success.main', width: 32, height: 32 }}>
                                                                        {toShiftInfo?.userName.charAt(0) || '?'}
                                                                    </Avatar>
                                                                    <Typography variant="h6" fontWeight="bold">
                                                                        Til skift
                                                                    </Typography>
                                                                </Box>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {toShiftInfo?.startTime ? formatDateTime(toShiftInfo.startTime) : 'Ukjent tid'}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {toShiftInfo?.location || 'Ingen lokasjon'}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    )}

                                                    {/* Gir vakt til (hvis GIVE_AWAY) */}
                                                    {request.swapType === 'GIVE_AWAY' && request.swapWithId && (
                                                        <Card 
                                                            elevation={1}
                                                            sx={{ 
                                                                flex: 1,
                                                                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                                                                mb: 2
                                                            }}
                                                        >
                                                            <CardContent>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                    <Avatar sx={{ mr: 1, bgcolor: 'warning.main', width: 32, height: 32 }}>
                                                                        {getUserName(request.swapWithId).charAt(0)}
                                                                    </Avatar>
                                                                    <Typography variant="h6" fontWeight="bold">
                                                                        Gir vakt til
                                                                    </Typography>
                                                                </Box>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {getUserName(request.swapWithId)}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    )}

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
                                                            Avvist: {formatDateTime(request.updatedAt || request.requestedAt)}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
}

export default ShiftSwapPage;
