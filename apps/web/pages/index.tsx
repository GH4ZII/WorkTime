import React, {useEffect, useState} from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { useData } from '../context/DataContext';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    CircularProgress,
    Alert,
    Divider
} from '@mui/material';
import { apiUrl } from '../utils/api';
import {
    Schedule as ScheduleIcon,
    SwapHoriz as SwapIcon,
    Event as EventIcon
} from '@mui/icons-material';

interface TimeOffRequest {
    id: string;
    userId: string;
    fromDate: string;
    toDate: string;
    type: 'VACATION' | 'SICK' | 'OTHER';
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface Shift {
    id: string;
    startTime: string;
}

interface SwapRequest {
    id: string;
    requestedById: string;
    fromShiftId: string;
    swapType: string;
    swapWithId: string;
    toShiftId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface ShiftApplication {
    id: string;
    userId: string;
    shiftId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    message?: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    shift: {
        id: string;
        startTime: string;
        endTime: string;
        location?: string;
        notes?: string;
    };
}

interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'ADMIN' | 'EMPLOYEE';
}

type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <Card
        elevation={2}
        sx={{
            height: '100%',
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `1px solid ${color}20`,
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${color}20`,
            }
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                    sx={{
                        backgroundColor: color,
                        borderRadius: 2,
                        p: 1,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" component="div" fontWeight="bold" color="text.primary">
                        {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const HomePage: NextPage = () => {
    const { 
        employees, 
        shifts, 
        timeOffRequests, 
        swapRequests, 
        loading, 
        error 
    } = useData();

    const [pendingShiftApplications, setPendingShiftApplications] = useState<ShiftApplication[]>([]);

    // Filtrer kun på ventende forespørsler
    const pendingTimeOffRequests = timeOffRequests.filter(req => req.status === 'PENDING');
    const pendingSwapRequests = swapRequests.filter(req => req.status === 'PENDING');
    
    const pendingRequests = pendingTimeOffRequests.filter(req => req.type === 'VACATION').length;

    // Hent skiftsøknader
    const fetchShiftApplications = async () => {
        try {
            const response = await fetch(apiUrl('/shift-applications'), {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                const pending = data.filter((app: ShiftApplication) => app.status === 'PENDING');
                setPendingShiftApplications(pending);
            }
        } catch (error) {
            console.error('Feil ved henting av skiftsøknader:', error);
        }
    };

    // Hent skiftsøknader når komponenten lastes
    useEffect(() => {
        fetchShiftApplications();
    }, []);

    // Oppslagskart
    const shiftDateById = React.useMemo(() => {
        return Object.fromEntries(
            shifts.map(s => [s.id, s.startTime])
        );
    }, [shifts]);

    // Formater datoen til norsk format (dd.mm.åååå)
    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('no-NO');
    };

    // Formater tid til norsk format (HH:MM)
    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleTimeString('no-NO', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });
    };

    const getRequestTypeColor = (type: string) => {
        switch (type) {
            case 'VACATION': return 'success';
            case 'SICK': return 'error';
            case 'OTHER': return 'warning';
            default: return 'default';
        }
    };

    const getRequestTypeLabel = (type: string) => {
        switch (type) {
            case 'VACATION': return 'Ferie';
            case 'SICK': return 'Syk';
            case 'OTHER': return 'Annet';
            default: return type;
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
        <>
            <Head>
                <title>WorkTime - Dashboard</title>
            </Head>
            <Layout>
                <Box sx={{ p: 3 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Stats Cards */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>

                        <StatCard
                            title="Aktive skift"
                            value={shifts.length}
                            icon={<ScheduleIcon sx={{ color: 'white' }} />}
                            color="#764ba2"
                        />
                        <StatCard
                            title="Bytteforespørsler"
                            value={pendingSwapRequests.length}
                            icon={<SwapIcon sx={{ color: 'white' }} />}
                            color="#f093fb"
                        />
                        <StatCard
                            title="Ferieforespørsler"
                            value={pendingRequests}
                            icon={<EventIcon sx={{ color: 'white' }} />}
                            color="#4facfe"
                        />
                        <StatCard
                            title="Skiftsøknader"
                            value={pendingShiftApplications.length}
                            icon={<ScheduleIcon sx={{ color: 'white' }} />}
                            color="#4caf50"
                        />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
                        {/* Skiftsøknader - kun ventende */}
                        <Box>
                            <Card elevation={2} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="h6" component="h2" fontWeight="bold">
                                            Skiftsøknader
                                        </Typography>
                                    </Box>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Ansatt</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Skift</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Melding</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pendingShiftApplications.length > 0 ? (
                                                    pendingShiftApplications.map(app => (
                                                        <TableRow key={app.id} hover>
                                                            <TableCell>
                                                                <Typography variant="body2" fontWeight="medium">
                                                                    {app.user.name}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography variant="body2">
                                                                    {formatTime(app.shift.startTime)} - {formatTime(app.shift.endTime)}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                                                    {app.message || 'Ingen melding'}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    label="Venter"
                                                                    color="warning"
                                                                    size="small"
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={4} align="center">
                                                            <Typography color="text.secondary">
                                                                Ingen ventende skiftsøknader
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Box>

                        {/* Bytteforespørsler - kun ventende */}
                        <Box>
                            <Card elevation={2} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <SwapIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="h6" component="h2" fontWeight="bold">
                                            Bytteforespørsler
                                        </Typography>
                                    </Box>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Ansatt</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Bytte med</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Dato</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pendingSwapRequests.length > 0 ? (
                                                    pendingSwapRequests.map(sr => {
                                                        const requester = employees.find(e => e.id === sr.requestedById)?.name;
                                                        const swapWith = employees.find(e => e.id === sr.swapWithId)?.name;
                                                        const dateFrom = shiftDateById[sr.fromShiftId];
                                                        const dateTo = shiftDateById[sr.toShiftId];

                                                        return (
                                                            <TableRow key={sr.id} hover>
                                                                <TableCell>
                                                                    <Typography variant="body2" fontWeight="medium">
                                                                        {requester || sr.requestedById}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant="body2">
                                                                        {swapWith || sr.swapWithId}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Box>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Fra: {dateFrom ? formatDate(dateFrom) : 'N/A'}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Til: {dateTo ? formatDate(dateTo) : 'N/A'}
                                                                        </Typography>
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="center">
                                                            <Typography color="text.secondary">
                                                                Ingen ventende bytteforespørsler
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Box>

                        {/* Fraværsforespørsler - kun ventende */}
                        <Box sx={{ mt: 3 }}>
                            <Card elevation={2}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="h6" component="h2" fontWeight="bold">
                                            Fraværsforespørsler
                                        </Typography>
                                    </Box>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Ansatt</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Fra</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Til</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pendingTimeOffRequests.length > 0 ? (
                                                    pendingTimeOffRequests.map(sr => {
                                                        const requester = employees.find(e => e.id === sr.userId)?.name;

                                                        return (
                                                            <TableRow key={sr.id} hover>
                                                                <TableCell>
                                                                    <Typography variant="body2" fontWeight="medium">
                                                                        {requester || sr.userId}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Chip
                                                                        label={getRequestTypeLabel(sr.type)}
                                                                        color={getRequestTypeColor(sr.type) as any}
                                                                        size="small"
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant="body2">
                                                                        {formatDate(sr.fromDate)}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant="body2">
                                                                        {formatDate(sr.toDate)}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Chip
                                                                        label="Venter"
                                                                        color="warning"
                                                                        size="small"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} align="center">
                                                            <Typography color="text.secondary">
                                                                Ingen ventende fraværsforespørsler
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Layout>
        </>
    );
};

export default HomePage;
