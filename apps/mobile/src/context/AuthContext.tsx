import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

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


    const signIn = async (email, password) => {
        try {
            const response = await axios.post('http://10.130.50.26:3001/auth/login', {
                email,
                password,
            });

            const { access_token: accessToken } = response.data;

            setToken(accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            await SecureStore.setItemAsync('userToken', accessToken);
        } catch (error) {
            console.error('Feil ved innlogging:', error);
        }
    };

    const signOut = async () => {
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
        await SecureStore.deleteItemAsync('userToken');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, signIn, signOut }}>
    {children}
    </AuthContext.Provider>
);
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
