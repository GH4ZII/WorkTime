import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import axios from 'axios';
import { Layout } from '../components/Layout';
import { useData } from '../context/DataContext';
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
    Paper
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Work as WorkIcon,
    CalendarToday as CalendarIcon,
    Save as SaveIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';

interface Employee {
    id: string;
    name: string;
    email: string;
    role?: string;
    phone?: string;
    hireDate?: string;
}

interface CreateEmployeeDto {
    name: string;
    email: string;
    password: string;
    role?: string;
    phone?: string;
    hireDate?: string;
}

const CoWorkerPage: NextPage = () => {
    const { employees, loading, error, refreshEmployees } = useData();
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form state for ny ansatt
    const [form, setForm] = useState<CreateEmployeeDto>({
        name: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        hireDate: new Date().toISOString().split('T')[0]
    });

    // Form state for redigering
    const [editForm, setEditForm] = useState<CreateEmployeeDto>({
        name: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        hireDate: '',
    });

    useEffect(() => {
        refreshEmployees();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:3001/users', form, { 
                withCredentials: true 
            });
            
            setSuccess('Ansatt opprettet!');
            setForm({ name: '', email: '', password: '', role: '', phone: '', hireDate: new Date().toISOString().split('T')[0] });
            setShowForm(false);
            refreshEmployees();
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setLocalError('Kunne ikke opprette ansatt: ' + err.message);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!editingEmployee) return;

        try {
            const updateData = { ...editForm };
            // Fjern password hvis det er tomt (ikke endret)
            if (!updateData.password) {
                delete updateData.password;
            }

            await axios.put(`http://localhost:3001/users/${editingEmployee.id}`, updateData, { 
                withCredentials: true 
            });
            
            setSuccess('Ansatt oppdatert!');
            setShowEditForm(false);
            setEditingEmployee(null);
            setEditForm({ name: '', email: '', password: '', role: '', phone: '', hireDate: '' });
            refreshEmployees();
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setLocalError('Kunne ikke oppdatere ansatt: ' + err.message);
        }
    };

    const handleDelete = async (employeeId: string, employeeName: string) => {
        if (!confirm(`Er du sikker på at du vil slette ${employeeName}? Dette kan ikke angres.`)) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3001/users/${employeeId}`, { 
                withCredentials: true 
            });
            
            setSuccess('Ansatt slettet!');
            refreshEmployees();
            
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setLocalError('Kunne ikke slette ansatt: ' + err.message);
        }
    };

    const startEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setEditForm({
            name: employee.name,
            email: employee.email,
            password: '', // Tomt for sikkerhet
            role: employee.role || '',
            phone: employee.phone || '',
            hireDate: employee.hireDate || '',
        });
        setShowEditForm(true);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Ikke satt';
        return new Date(dateString).toLocaleDateString('nb-NO');
    };

    const getRoleDisplayName = (role?: string) => {
        switch (role) {
            case 'ADMIN':
                return 'Administrator';
            case 'EMPLOYEE':
                return 'Ansatt';
            default:
                return 'Ikke satt';
        }
    };

    const getRoleColor = (role?: string) => {
        switch (role) {
            case 'ADMIN':
                return 'primary';
            case 'EMPLOYEE':
                return 'default';
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
                {(error || localError) && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error || localError}
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
                            Medarbeider Administrasjon
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Administrer ansatte og deres roller
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
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5a6fd8 0%, #667eea 100%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Legg til ny ansatt
                    </Button>
                </Box>

                {/* Skjema for ny ansatt */}
                <Dialog 
                    open={showForm} 
                    onClose={() => setShowForm(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle sx={{ pb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon color="primary" />
                            <Typography variant="h6" fontWeight="bold">
                                Legg til ny ansatt
                            </Typography>
                        </Box>
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Navn"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="E-post"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Passord"
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Rolle</InputLabel>
                                        <Select
                                            name="role"
                                            value={form.role}
                                            onChange={handleChange}
                                            label="Rolle"
                                        >
                                            <MenuItem value="">Velg rolle</MenuItem>
                                            <MenuItem value="EMPLOYEE">Ansatt</MenuItem>
                                            <MenuItem value="ADMIN">Administrator</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Telefon"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Ansettelsesdato"
                                        name="hireDate"
                                        type="date"
                                        value={form.hireDate}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
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
                                Lagre ansatt
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
                                Rediger ansatt: {editingEmployee?.name}
                            </Typography>
                        </Box>
                    </DialogTitle>
                    <form onSubmit={handleEdit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Navn"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="E-post"
                                        name="email"
                                        type="email"
                                        value={editForm.email}
                                        onChange={handleEditChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Nytt passord (la stå tomt for å beholde)"
                                        name="password"
                                        type="password"
                                        value={editForm.password}
                                        onChange={handleEditChange}
                                        variant="outlined"
                                        placeholder="La stå tomt for å beholde nåværende"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Rolle</InputLabel>
                                        <Select
                                            name="role"
                                            value={editForm.role}
                                            onChange={handleEditChange}
                                            label="Rolle"
                                        >
                                            <MenuItem value="">Velg rolle</MenuItem>
                                            <MenuItem value="EMPLOYEE">Ansatt</MenuItem>
                                            <MenuItem value="ADMIN">Administrator</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Telefon"
                                        name="phone"
                                        value={editForm.phone}
                                        onChange={handleEditChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Ansettelsesdato"
                                        name="hireDate"
                                        type="date"
                                        value={editForm.hireDate}
                                        onChange={handleEditChange}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
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
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #5a6fd8 0%, #667eea 100%)',
                                    }
                                }}
                            >
                                Oppdater ansatt
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                {/* Oversikt over ansatte */}
                <Card elevation={2}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                Oversikt over ansatte ({employees.length})
                            </Typography>
                        </Box>

                        {employees.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    Ingen ansatte funnet
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Legg til din første ansatt for å komme i gang
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {employees.map(employee => (
                                    <Grid item xs={12} sm={6} lg={4} key={employee.id}>
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
                                                            width: 48,
                                                            height: 48
                                                        }}
                                                    >
                                                        {employee.name.charAt(0)}
                                                    </Avatar>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography variant="h6" fontWeight="bold">
                                                            {employee.name}
                                                        </Typography>
                                                        <Chip
                                                            label={getRoleDisplayName(employee.role)}
                                                            color={getRoleColor(employee.role) as any}
                                                            size="small"
                                                        />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                        <Tooltip title="Rediger">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => startEdit(employee)}
                                                                sx={{ color: 'primary.main' }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Slett">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDelete(employee.id, employee.name)}
                                                                sx={{ color: 'error.main' }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>

                                                <Divider sx={{ my: 2 }} />

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <EmailIcon fontSize="small" color="action" />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {employee.email}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PhoneIcon fontSize="small" color="action" />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {employee.phone || 'Ikke satt'}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <CalendarIcon fontSize="small" color="action" />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatDate(employee.hireDate)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
};

export default CoWorkerPage;
