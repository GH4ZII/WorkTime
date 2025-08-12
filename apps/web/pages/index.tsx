import React, {useEffect} from 'react';
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
    Avatar,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
    Divider
} from '@mui/material';
import {
    People as PeopleIcon,
    Schedule as ScheduleIcon,
    Notifications as NotificationsIcon,
    Work as WorkIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
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

    const totalEmployees = employees.length;
    
    // Filtrer kun på ventende forespørsler
    const pendingTimeOffRequests = timeOffRequests.filter(req => req.status === 'PENDING');
    const pendingSwapRequests = swapRequests.filter(req => req.status === 'PENDING');
    
    const totalRequests = pendingTimeOffRequests.length + pendingSwapRequests.length;
    const pendingRequests = pendingTimeOffRequests.filter(req => req.type === 'VACATION').length;

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

                    <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 4, color: 'text.primary' }}>
                        Dashboard
                    </Typography>

                    {/* Stats Cards */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                        <StatCard
                            title="Totalt ansatte"
                            value={totalEmployees}
                            icon={<PeopleIcon sx={{ color: 'white' }} />}
                            color="#1976d2"
                        />
                        <StatCard
                            title="Aktive skift"
                            value={shifts.length}
                            icon={<ScheduleIcon sx={{ color: 'white' }} />}
                            color="#2e7d32"
                        />
                        <StatCard
                            title="Ventende forespørsler"
                            value={totalRequests}
                            icon={<NotificationsIcon sx={{ color: 'white' }} />}
                            color="#ed6c02"
                        />
                        <StatCard
                            title="Ferieforespørsler"
                            value={pendingRequests}
                            icon={<EventIcon sx={{ color: 'white' }} />}
                            color="#9c27b0"
                        />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
                        {/* Ansatte og kommende skift */}
                        <Box>
                            <Card elevation={2} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="h6" component="h2" fontWeight="bold">
                                            Ansatte
                                        </Typography>
                                    </Box>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Ansatt</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Rolle</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Kontakt</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {employees.length > 0 ? (
                                                    employees.map((employee) => (
                                                        <TableRow key={employee.id} hover>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                                        {employee.name.charAt(0)}
                                                                    </Avatar>
                                                                    <Typography variant="body2" fontWeight="medium">
                                                                        {employee.name}
                                                                    </Typography>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Chip
                                                                    label={employee.role === 'ADMIN' ? 'Administrator' : 'Ansatt'}
                                                                    size="small"
                                                                    color={employee.role === 'ADMIN' ? 'primary' : 'default'}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                                    <Tooltip title={employee.phone}>
                                                                        <IconButton size="small">
                                                                            <PhoneIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title={employee.email}>
                                                                        <IconButton size="small">
                                                                            <EmailIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="center">
                                                            <Typography color="text.secondary">
                                                                Ingen ansatte funnet
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
                                            Bytteforespørsler (Venter)
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
                                            Fraværsforespørsler (Venter)
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
