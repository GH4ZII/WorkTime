import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import { apiUrl } from '../utils/api';

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token && router.isReady) {
      setError('Ugyldig eller manglende token');
    }
  }, [token, router.isReady]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      setError('Nytt passord er påkrevd');
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError('Passordet må være minst 6 tegn');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passordene stemmer ikke overens');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(apiUrl('/auth/reset-password'), {
        token: token as string,
        newPassword: formData.newPassword,
      });

      console.log('Password reset successful:', response.data);
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (error: any) {
      console.error('Password reset failed:', error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 400) {
        setError('Ugyldig eller utløpt token');
      } else {
        setError('En feil oppstod. Prøv igjen senere.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              background: 'white',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                Passord tilbakestilt!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Passordet ditt har blitt oppdatert. Du blir omdirigert til innloggingssiden...
              </Typography>
              <CircularProgress size={24} sx={{ color: '#667eea' }} />
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'white',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Lock sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              Tilbakestill passord
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Skriv inn ditt nye passord
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              label="Nytt passord"
              value={formData.newPassword}
              onChange={handleInputChange}
              disabled={loading}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Minimum 6 tegn"
            />

            <TextField
              fullWidth
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Bekreft nytt passord"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
              sx={{ mb: 4 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !token}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #4c63d2 100%)',
                },
                '&:disabled': {
                  background: '#e0e0e0',
                  color: '#9e9e9e',
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  Tilbakestiller...
                </>
              ) : (
                'Tilbakestill passord'
              )}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Husket du passordet?{' '}
              <Button
                variant="text"
                onClick={() => router.push('/login')}
                sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
              >
                Logg inn her
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;
