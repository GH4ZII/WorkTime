import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import { apiUrl } from '../utils/api';
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
    Paper,
    Link
} from "@mui/material";
import { 
    Email as EmailIcon, 
    Lock as LockIcon, 
    Visibility, 
    VisibilityOff,
    Login as LoginIcon
} from '@mui/icons-material';
import ForgotPassword from '../components/ForgotPassword';
import Image from 'next/image'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const router = useRouter();

    // Sjekk for feilmelding fra URL
    React.useEffect(() => {
        const { error: urlError } = router.query;
        if (urlError === 'unauthorized') {
            setError('Kun administratorer har tilgang til web-appen. Vennligst bruk mobil-appen i stedet.');
        }
    }, [router.query]);

    // Funksjon for å dekode JWT token og sjekke rolle
    const decodeTokenAndCheckRole = (token: string): boolean => {
        try {
            // JWT tokens har format: header.payload.signature
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            
            // Sjekk om brukeren er administrator
            return decodedPayload.role?.toLowerCase() === 'admin';
        } catch (error) {
            console.error('Feil ved dekoding av token:', error);
            return false;
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(apiUrl('/auth/login'), {
                email,
                password,
            });

            const { access_token, user } = response.data;

            // Sjekk om brukeren er administrator
            if (!decodeTokenAndCheckRole(access_token)) {
                setError('Kun administratorer har tilgang til web-appen. Vennligst bruk mobil-appen i stedet.');
                setLoading(false);
                return;
            }

            // TODO: For produksjon bør vi sette httpOnly-flagget via en API-rute
            document.cookie = `auth_token=${access_token}; path=/;`;

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

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    const handleForgotPasswordClose = () => {
        setShowForgotPassword(false);
    };

    const handleBackToLogin = () => {
        setShowForgotPassword(false);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: '#764ba2',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                overflow: 'hidden',
            }}
        >
            {/* Top-left transparent logo overlay */}
            <Box sx={{ position: 'absolute', top: -50, left: -50, zIndex: 2 }}>
                    <Image src="/images/Design_uten_navn-removebg-preview.png" alt="WorkTime logo" width={380} height={220} priority />
            </Box>
            {/* Wave Background Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle at 30% 20%, rgba(118, 75, 162, 0.4) 0%, transparent 50%)',
                    animation: 'float 20s ease-in-out infinite',
                }}
            />
            
            <Box
                sx={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-40%',
                    width: '180%',
                    height: '180%',
                    background: 'radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.3) 0%, transparent 50%)',
                    animation: 'float 25s ease-in-out infinite reverse',
                }}
            />
            
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-60%',
                    left: '20%',
                    width: '140%',
                    height: '140%',
                    background: 'radial-gradient(circle at 40% 60%, rgba(118, 75, 162, 0.2) 0%, transparent 50%)',
                    animation: 'float 30s ease-in-out infinite',
                }}
            />

            {/* Floating Wave Shapes */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    animation: 'wave 8s ease-in-out infinite',
                }}
            />
            
            <Box
                sx={{
                    position: 'absolute',
                    top: '60%',
                    right: '10%',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '50%',
                    animation: 'wave 12s ease-in-out infinite reverse',
                }}
            />

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <Card
                    elevation={24}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #764ba2 0%, #6a4190 100%)',
                            padding: 4,
                            textAlign: 'center',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header Wave Effect */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '-2px',
                                left: 0,
                                right: 0,
                                height: '20px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-10px',
                                    left: 0,
                                    right: 0,
                                    height: '20px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    clipPath: 'polygon(0 100%, 25% 0, 75% 0, 100% 100%)',
                                }
                            }}
                        />
                        
                        <LoginIcon sx={{ fontSize: 48, mb: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            Velkommen tilbake
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, opacity: 0.95, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
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
                                            <EmailIcon sx={{ color: '#764ba2' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        '&:hover fieldset': {
                                            borderColor: '#764ba2',
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#764ba2',
                                            borderWidth: '2px',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#764ba2',
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
                                            <LockIcon sx={{ color: '#764ba2' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                                sx={{ color: '#764ba2' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        '&:hover fieldset': {
                                            borderColor: '#764ba2',
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#764ba2',
                                            borderWidth: '2px',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#764ba2',
                                    },
                                }}
                            />

                            {error && (
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        width: '100%', 
                                        mt: 2,
                                        borderRadius: 3,
                                        border: '1px solid rgba(211, 47, 47, 0.2)',
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
                                    py: 1.8,
                                    borderRadius: 3,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                                    boxShadow: '0 8px 25px rgba(118, 75, 162, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #6a4190 0%, #5d377a 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 35px rgba(118, 75, 162, 0.4)',
                                    },
                                    '&:disabled': {
                                        background: 'linear-gradient(135deg, #764ba2 0%, #6a4190 100%)',
                                        opacity: 0.7,
                                    },
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Logg inn'
                                )}
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Link
                                    component="button"
                                    type="button"
                                    variant="body2"
                                    onClick={handleForgotPasswordClick}
                                    sx={{
                                        color: '#764ba2',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            color: '#6a4190',
                                        },
                                    }}
                                >
                                    Glemt passord?
                                </Link>
                            </Box>

                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                align="center"
                                sx={{ mt: 2, opacity: 0.8 }}
                            >
                                Sikker innlogging med kryptert overføring
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(1deg); }
                    66% { transform: translateY(10px) rotate(-1deg); }
                }
                
                @keyframes wave {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.1; }
                    50% { transform: scale(1.2) rotate(180deg); opacity: 0.2; }
                }
            `}</style>

            {/* Forgot Password Dialog */}
            <ForgotPassword
                open={showForgotPassword}
                onClose={handleForgotPasswordClose}
            />
        </Box>
    );
};

export default Login;
