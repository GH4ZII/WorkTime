import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

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
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Admin Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Passord"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Logg inn
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
