import React, { useState, useEffect } from 'react'
import {NextPage} from 'next'
import { Layout } from '../components/Layout'
import axios from 'axios'
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
    Event as EventIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Person as PersonIcon,
    BeachAccess as VacationIcon,
    LocalHospital as SickIcon,
    Help as OtherIcon,
    CalendarToday as CalendarIcon,
    AccessTime as TimeIcon
} from '@mui/icons-material';

interface TimeOffRequest {
    id: string;
    userId: string;
    fromDate: string;
    toDate: string;
    type: 'VACATION' | 'SICK' | 'OTHER';
    reason?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt?: string;
    updatedAt?: string;
    user?: User;
}

interface User {
    id: string;
    name: string;
}

const VacancyPage: NextPage = () => {
    const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [requestsResponse, usersResponse] = await Promise.all([
                axios.get<TimeOffRequest[]>('http://localhost:3001/time-off-requests', { withCredentials: true }),
                axios.get<User[]>('http://localhost:3001/users', { withCredentials: true })
            ]);

            setTimeOffRequests(requestsResponse.data);
            setUsers(usersResponse.data);
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

    const formatFromDate = (date: string) => {
        return new Date(date).toLocaleDateString('no-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatToDate = (date: string) => {
        return new Date(date).toLocaleDateString('no-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const getRequestTitle = (request: TimeOffRequest) => {
        const userName = getUserName(request.userId);
        const type = request.type.charAt(0).toUpperCase() + request.type.slice(1);
        return `${userName} ønsker ${type} fra ${formatFromDate(request.fromDate)} til ${formatToDate(request.toDate)}`;
    };

    const getRequestDescription = (request: TimeOffRequest) => {
        const userName = getUserName(request.userId);
        const type = request.type.charAt(0).toUpperCase() + request.type.slice(1);
        return `${userName} ønsker ${type} fra ${formatFromDate(request.fromDate)} til ${formatToDate(request.toDate)}`;
    };

    const handleApprove = async (requestId: string) => {
        try {
            await axios.post(`http://localhost:3001/time-off-requests/${requestId}/approve`, {}, { withCredentials: true });
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleReject = async (requestId: string) => {
        try {
            await axios.post(`http://localhost:3001/time-off-requests/${requestId}/reject`, {}, { withCredentials: true });
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

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'VACATION':
                return <VacationIcon />;
            case 'SICK':
                return <SickIcon />;
            case 'OTHER':
                return <OtherIcon />;
            default:
                return <EventIcon />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'VACATION':
                return 'success';
            case 'SICK':
                return 'error';
            case 'OTHER':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'VACATION':
                return 'Ferie';
            case 'SICK':
                return 'Syk';
            case 'OTHER':
                return 'Annet';
            default:
                return type;
        }
    };

    const calculateDuration = (fromDate: string, toDate: string) => {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
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
                    <EventIcon sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
                            Fraværsforespørsler
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Administrer forespørsler om fravær
                        </Typography>
                    </Box>
                </Box>

                {timeOffRequests.length === 0 ? (
                    <Card elevation={2}>
                        <CardContent>
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    Ingen forespørsler funnet
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Det er ingen aktive fraværsforespørsler for øyeblikket
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {timeOffRequests.map(request => {
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
                                                        icon={getTypeIcon(request.type)}
                                                        label={getTypeLabel(request.type)}
                                                        color={getTypeColor(request.type) as any}
                                                        size="small"
                                                        sx={{ mt: 0.5 }}
                                                    />
                                                </Box>
                                                <Chip
                                                    label={getStatusDisplay(request.status)}
                                                    color={getStatusColor(request.status) as any}
                                                    variant={request.status === 'PENDING' ? 'filled' : 'outlined'}
                                                    size="small"
                                                />
                                            </Box>

                                            <Divider sx={{ my: 2 }} />

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CalendarIcon fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        Fra: {formatFromDate(request.fromDate)}
                                                    </Typography>
                                                </Box>
                                                
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CalendarIcon fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        Til: {formatToDate(request.toDate)}
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
        </Layout>
    );
}

export default VacancyPage;


