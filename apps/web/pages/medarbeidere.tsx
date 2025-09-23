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
    Divider,
    Tooltip,
    Paper,
    InputAdornment,
    Grid
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
    Cancel as CancelIcon,
    Search as SearchIcon
} from '@mui/icons-material';

interface Employee {
    id: string;
    name: string;
    email: string;
    role?: string;
    phone?: string;
    hireDate?: string;
    // ← Kun stillingsprosent, ikke maks timer
    positionPercentage?: number;
}

interface CreateEmployeeDto {
    name: string;
    email: string;
    password: string;
    role?: string;
    phone?: string;
    hireDate?: string;
    // ← Kun stillingsprosent, ikke maks timer
    positionPercentage?: number;
    maxHoursPerWeek?: number;
}

const CoWorkerPage: NextPage = () => {
    const { employees, loading, error, refreshEmployees } = useData();
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        // ← Kun stillingsprosent, ikke maks timer
        positionPercentage: 100
    });

    // Filtrer og sorter ansatte
    const filteredAndSortedEmployees = employees
        .filter(employee => 
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (employee.phone && employee.phone.includes(searchTerm))
        )
        .sort((a, b) => a.name.localeCompare(b.name, 'nb-NO'));

    useEffect(() => {
        refreshEmployees();
    }, []);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e: any) => {
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
            setEditForm({ name: '', email: '', password: '', role: '', phone: '', hireDate: '', positionPercentage: 100 });
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
            positionPercentage: employee.positionPercentage || 100
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
                                {/* ← Ny: Stillingsprosent velger med flere alternativer */}
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Stillingsprosent *</InputLabel>
                                        <Select
                                            name="positionPercentage"
                                            value={form.positionPercentage}
                                            onChange={handleChange}
                                            label="Stillingsprosent"
                                            required
                                        >
                                            <MenuItem value={100}>100% - Full stilling (40t/uke)</MenuItem>
                                            <MenuItem value={95}>95% - 95% stilling (38t/uke)</MenuItem>
                                            <MenuItem value={90}>90% - 90% stilling (36t/uke)</MenuItem>
                                            <MenuItem value={85}>85% - 85% stilling (34t/uke)</MenuItem>
                                            <MenuItem value={80}>80% - 80% stilling (32t/uke)</MenuItem>
                                            <MenuItem value={75}>75% - 75% stilling (30t/uke)</MenuItem>
                                            <MenuItem value={70}>70% - 70% stilling (28t/uke)</MenuItem>
                                            <MenuItem value={65}>65% - 65% stilling (26t/uke)</MenuItem>
                                            <MenuItem value={60}>60% - 60% stilling (24t/uke)</MenuItem>
                                            <MenuItem value={55}>55% - 55% stilling (22t/uke)</MenuItem>
                                            <MenuItem value={50}>50% - 50% stilling (20t/uke)</MenuItem>
                                            <MenuItem value={45}>45% - 45% stilling (18t/uke)</MenuItem>
                                            <MenuItem value={40}>40% - 40% stilling (16t/uke)</MenuItem>
                                            <MenuItem value={35}>35% - 35% stilling (14t/uke)</MenuItem>
                                            <MenuItem value={30}>30% - 30% stilling (12t/uke)</MenuItem>
                                            <MenuItem value={25}>25% - 25% stilling (10t/uke)</MenuItem>
                                            <MenuItem value={20}>20% - 20% stilling (8t/uke)</MenuItem>
                                            <MenuItem value={15}>15% - 15% stilling (6t/uke)</MenuItem>
                                            <MenuItem value={10}>10% - 10% stilling (4t/uke)</MenuItem>
                                            <MenuItem value={5}>5% - 5% stilling (2t/uke)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* ← Ny: Maks timer per uke (automatisk beregnet) */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Maks timer per uke"
                                        name="maxHoursPerWeek"
                                        type="number"
                                        value={form.maxHoursPerWeek || ''}
                                        onChange={handleChange}
                                        InputProps={{
                                            inputProps: { min: 0, max: 40 },
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                    />
                                    <small className="form-text text-muted">
                                        Automatisk beregnet basert på stillingsprosent
                                    </small>
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
                                    background: '#667eea',
                                    '&:hover': {
                                        background: '#667eea',
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
                                
                                {/* ← Ny: Kun stillingsprosent felt */}
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Stillingsprosent</InputLabel>
                                        <Select
                                            name="positionPercentage"
                                            value={editForm.positionPercentage || 100}
                                            onChange={handleEditChange}
                                            label="Stillingsprosent"
                                        >
                                            <MenuItem value={100}>100% - Full stilling</MenuItem>
                                            <MenuItem value={95}>95% - 95% stilling</MenuItem>
                                            <MenuItem value={90}>90% - 90% stilling</MenuItem>
                                            <MenuItem value={85}>85% - 85% stilling</MenuItem>
                                            <MenuItem value={80}>80% - 80% stilling</MenuItem>
                                            <MenuItem value={75}>75% - 75% stilling</MenuItem>
                                            <MenuItem value={70}>70% - 70% stilling</MenuItem>
                                            <MenuItem value={65}>65% - 65% stilling</MenuItem>
                                            <MenuItem value={60}>60% - 60% stilling</MenuItem>
                                            <MenuItem value={55}>55% - 55% stilling</MenuItem>
                                            <MenuItem value={50}>50% - 50% stilling</MenuItem>
                                            <MenuItem value={45}>45% - 45% stilling</MenuItem>
                                            <MenuItem value={40}>40% - 40% stilling</MenuItem>
                                            <MenuItem value={35}>35% - 35% stilling</MenuItem>
                                            <MenuItem value={30}>30% - 30% stilling</MenuItem>
                                            <MenuItem value={25}>25% - 25% stilling</MenuItem>
                                            <MenuItem value={20}>20% - 20% stilling</MenuItem>
                                            <MenuItem value={15}>15% - 15% stilling</MenuItem>
                                            <MenuItem value={10}>10% - 10% stilling</MenuItem>
                                            <MenuItem value={5}>5% - 5% stilling</MenuItem>
                                        </Select>
                                    </FormControl>
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

                {/* Oversikt over ansatte header + actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, gap: 2 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        Oversikt over ansatte ({filteredAndSortedEmployees.length})
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <TextField
                            placeholder="Søk etter navn, e-post eller telefon..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'text.secondary' }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                width: { xs: 220, sm: 300, md: 360 },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 999,
                                    bgcolor: 'grey.50',
                                    height: 40
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setShowForm(true)}
                            sx={{
                                height: 40,
                                px: 3,
                                borderRadius: 999,
                                fontWeight: 'bold',
                                backgroundColor: '#2563eb',
                                boxShadow: 'none',
                                '&:hover': { backgroundColor: '#1d4ed8' }
                            }}
                        >
                            Legg til ny ansatt
                        </Button>
                    </Box>
                </Box>

                {filteredAndSortedEmployees.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary">
                                    {searchTerm ? 'Ingen ansatte funnet for søket' : 'Ingen ansatte funnet'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {searchTerm ? 'Prøv å endre søkekriteriene' : 'Legg til din første ansatt for å komme i gang'}
                                </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2.5}>
                                {filteredAndSortedEmployees.map(employee => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={employee.id}>
                                        <Card 
                                            elevation={0}
                                            sx={{
                                                height: '100%',
                                                borderRadius: 3,
                                                backgroundColor: 'grey.50',
                                                border: '1px solid',
                                                borderColor: 'grey.200',
                                                boxShadow: 'none',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 18px rgba(16,24,40,0.12)'
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 2.25 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                    <Avatar 
                                                        sx={{ 
                                                            bgcolor: '#fff',
                                                            color: 'text.primary',
                                                            border: '1px solid',
                                                            borderColor: 'divider',
                                                            mr: 2,
                                                            width: 44,
                                                            height: 44
                                                        }}
                                                    >
                                                        {employee.name.charAt(0)}
                                                    </Avatar>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            {employee.name}
                                                        </Typography>
                                                        <Chip
                                                            label={getRoleDisplayName(employee.role)}
                                                            color="default"
                                                            size="small"
                                                            sx={{ borderRadius: 999, height: 22, bgcolor: 'grey.100' }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ display: 'flex', gap: 1.5, ml: 4 }}>
                                                        <Tooltip title="Rediger">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => startEdit(employee)}
                                                                sx={{ 
                                                                    color: 'text.primary', 
                                                                    bgcolor: '#fff',
                                                                    border: '1px solid',
                                                                    borderColor: 'divider'
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Slett">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDelete(employee.id, employee.name)}
                                                                sx={{ 
                                                                    color: 'text.primary', 
                                                                    bgcolor: '#fff',
                                                                    border: '1px solid',
                                                                    borderColor: 'divider'
                                                                }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>

                                                <Divider sx={{ my: 1.5 }} />

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <EmailIcon fontSize="small" sx={{ color: 'grey.500' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {employee.email}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PhoneIcon fontSize="small" sx={{ color: 'grey.500' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {employee.phone || 'Ikke satt'}
                                                        </Typography>
                                                    </Box>
                                                    
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <CalendarIcon fontSize="small" sx={{ color: 'grey.500' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatDate((employee as any).hireDate)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                    </Grid>
                )}
            </Box>
        </Layout>
    );
};

export default CoWorkerPage;
