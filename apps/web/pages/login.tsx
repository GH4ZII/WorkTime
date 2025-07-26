import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://10.129.48.163:3001/auth/login', {
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
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
                <h2>Admin Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-post"
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Passord"
                    required
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>Logg inn</button>
            </form>
        </div>
    );
};

// Enkel styling
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
    form: { display: 'flex', flexDirection: 'column' as 'column', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    input: { padding: '0.8rem', margin: '0.5rem 0', border: '1px solid #ccc', borderRadius: '4px' },
    button: { padding: '0.8rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red' },
};

export default Login;
