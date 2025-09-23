import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import axios from 'axios'
import { apiUrl } from '../utils/api';

interface ForgotPasswordProps {
    open: boolean;
    onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState<'email' | 'reset'>('email');

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post(apiUrl('/auth/forgot-password'), {
                email,
            });

            setSuccess(response.data.message);
            // For testing purposes, show the token
            if (response.data.token) {
                setToken(response.data.token);
                setStep('reset');
            }
        } catch (err: any) {
            setError('En feil oppstod ved forespørsel om passordtilbakestilling. Vennligst prøv igjen.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passordene stemmer ikke overens');
            return;
        }

        if (newPassword.length < 6) {
            setError('Passordet må være minst 6 tegn langt');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(apiUrl('/auth/reset-password'), {
                token,
                newPassword,
            });

            setSuccess(response.data.message);
            setTimeout(() => {
                onClose();
                // Reset form
                setStep('email');
                setEmail('');
                setToken('');
                setNewPassword('');
                setConfirmPassword('');
                setError('');
                setSuccess('');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'En feil oppstod ved tilbakestilling av passord. Vennligst prøv igjen.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        // Reset form
        setStep('email');
        setEmail('');
        setToken('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess('');
    };


    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                }
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                        borderRadius: '12px 12px 0 0',
                        padding: 3,
                        margin: -3,
                        marginBottom: 2,
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <LockIcon sx={{ fontSize: 40, mb: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                    <Typography variant="h5" component="h2" fontWeight="bold" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        {step === 'email' ? 'Glemt passord' : 'Tilbakestill passord'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.95, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        {step === 'email' 
                            ? 'Skriv inn din e-postadresse for å få en tilbakestillingslenke'
                            : 'Skriv inn det nye passordet ditt'
                        }
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ padding: 3 }}>
                {step === 'email' ? (
                    <Box component="form" onSubmit={handleRequestReset}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-postadresse"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea',
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

                        {success && (
                            <Alert 
                                severity="success" 
                                sx={{ 
                                    width: '100%', 
                                    mt: 2,
                                    borderRadius: 3,
                                    border: '1px solid rgba(76, 175, 80, 0.2)',
                                }}
                            >
                                {success}
                            </Alert>
                        )}
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleResetPassword}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="token"
                            label="Reset Token (for testing)"
                            name="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea',
                                },
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="Nytt passord"
                            type={showPassword ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: '#667eea' }}
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
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea',
                                },
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Bekreft nytt passord"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                            sx={{ color: '#667eea' }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                        borderWidth: '2px',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea',
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

                        {success && (
                            <Alert 
                                severity="success" 
                                sx={{ 
                                    width: '100%', 
                                    mt: 2,
                                    borderRadius: 3,
                                    border: '1px solid rgba(76, 175, 80, 0.2)',
                                }}
                            >
                                {success}
                            </Alert>
                        )}
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ padding: 3, pt: 1 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: 'text.secondary',
                        mr: 1,
                    }}
                >
                    Lukk
                </Button>
                
                <Button
                    onClick={step === 'email' ? handleRequestReset : handleResetPassword}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        borderRadius: 3,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #4c5fd6 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                        },
                        '&:disabled': {
                            background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                            opacity: 0.7,
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        step === 'email' ? 'Send tilbakestillingslenke' : 'Tilbakestill passord'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ForgotPassword;
