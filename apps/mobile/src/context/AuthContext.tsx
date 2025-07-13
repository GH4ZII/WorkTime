import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'; // Sørg for at axios er installert

// Definer hva slags data contexten skal holde
interface AuthContextData {
    token: string | null;
    isAuthenticated: boolean;
    signIn: (email, password) => Promise<void>;
    signOut: () => void;
}

// Opprett Contexten
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Dette er komponenten som vil "pakke inn" appen vår
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    // Denne kjører når appen starter for å sjekke om vi har et lagret token
    useEffect(() => {
        async function loadToken() {
            const storedToken = await SecureStore.getItemAsync('userToken');
            if (storedToken) {
                setToken(storedToken);
                // Sett axios til å alltid sende med tokenet
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }
        }
        loadToken();
    }, []);

// Erstatt den gamle signIn-funksjonen med denne:
    const signIn = async (email, password) => {
        try {
            console.log('--- Starter innlogging ---');
            const response = await axios.post('http://10.130.50.26:3001/auth/login', {
                email,
                password,
            });

            // SPION-KODE 1: Se nøyaktig hva serveren returnerer
            console.log('Full API Respons (response.data):', JSON.stringify(response.data, null, 2));

            const { access_token: accessToken } = response.data;

            // SPION-KODE 2: Se hva vi faktisk hentet ut
            console.log('Utpakket accessToken:', accessToken);
            // SPION-KODE 3: Se datatypen
            console.log('Datatype for accessToken:', typeof accessToken);


            if (typeof accessToken !== 'string') {
                throw new Error('Verdien som ble hentet ut fra "accessToken" er ikke en streng!');
            }

            setToken(accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            console.log('Prøver å lagre i SecureStore...');
            await SecureStore.setItemAsync('userToken', accessToken);
            console.log('Lagring i SecureStore var vellykket!');


        } catch (error) {
            console.error('--- FEIL under innlogging ---');
            // Viser hele feilobjektet for mer detaljer
            console.error(error);

            // Kaster den originale feilen videre slik at LoginScreen kan vise den
            throw error;
        }
    };

    const signOut = async () => {
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
        await SecureStore.deleteItemAsync('userToken');
    };

    // isAuthenticated er true hvis token ikke er null
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, signIn, signOut }}>
    {children}
    </AuthContext.Provider>
);
};

// En egen "hook" for å gjøre det enkelt å bruke contexten i andre filer
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
