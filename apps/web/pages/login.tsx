import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { 
    Container, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Alert, 
    Card, 
    CardContent,
    InputAdornment,
    IconButton,
    CircularProgress,
    Paper
} from "@mui/material";
import { 
    Email as EmailIcon, 
    Lock as LockIcon, 
    Visibility, 
    VisibilityOff,
    Login as LoginIcon
} from '@mui/icons-material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password,
            });

            // TODO: For produksjon bør vi sette httpOnly-flagget via en API-rute
            document.cookie = `auth_token=${response.data.access_token}; path=/;`;

            router.push('/'); // Omdiriger til forsiden etter innlogging
        } catch (err) {
            setError('Feil brukernavn eller passord. Vennligst prøv igjen.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    elevation={24}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                            padding: 4,
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        <LoginIcon sx={{ fontSize: 48, mb: 2 }} />
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Velkommen tilbake
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                            Logg inn på din konto
                        </Typography>
                    </Box>

                    <CardContent sx={{ padding: 4 }}>
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-postadresse"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Passord"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                }}
                            />

                            {error && (
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        width: '100%', 
                                        mt: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    mt: 4,
                                    mb: 2,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                                    },
                                    '&:disabled': {
                                        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                                        opacity: 0.7,
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Logg inn'
                                )}
                            </Button>

                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                align="center"
                                sx={{ mt: 2 }}
                            >
                                Sikker innlogging med kryptert overføring
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;
