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
    ArrowForward as ArrowIcon
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
}

const ShiftSwapPage: NextPage = () => {
    const [swapRequests, setSwapRequests] = useState<ShiftSwapRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        return user?.name || 'Ukjent bruker';
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
            fetchData();
        } catch (err: any) {
            setError(err.message);
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

                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <SwapIcon sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                            Bytteforespørsler
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Administrer forespørsler om skiftbytte
                        </Typography>
                    </Box>
                </Box>

                {swapRequests.length === 0 ? (
                    <Card elevation={2}>
                        <CardContent>
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <SwapIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    Ingen forespørsler funnet
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Det er ingen aktive bytteforespørsler for øyeblikket
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {swapRequests.map(request => {
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
                                                <Chip
                                                    label={getStatusDisplay(request.status)}
                                                    color={getStatusColor(request.status) as any}
                                                    variant={request.status === 'PENDING' ? 'filled' : 'outlined'}
                                                    sx={{ ml: 2 }}
                                                />
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

                                                {/* Til skift */}
                                                {request.swapType === 'SWAP' && toShiftInfo && (
                                                    <Card 
                                                        elevation={1}
                                                        sx={{ 
                                                            flex: 1,
                                                            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
                                                        }}
                                                    >
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                                <Avatar sx={{ mr: 1, bgcolor: 'secondary.main', width: 32, height: 32 }}>
                                                                    {toShiftInfo.userName.charAt(0)}
                                                                </Avatar>
                                                                <Typography variant="h6" fontWeight="bold">
                                                                    Til skift
                                                                </Typography>
                                                            </Box>
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
                                                        </CardContent>
                                                    </Card>
                                                )}
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
            </Box>
        </Layout>
    );
}

export default ShiftSwapPage;
