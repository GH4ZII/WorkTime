import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { Platform } from 'react-native';
import { API_ENDPOINTS } from '../config/api-simple';

interface User {
    id: string;
    name: string;
    email: string;
    // Legg til andre brukerfelter du trenger
}

interface AuthContextData {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadStoredData() {
            const [storedToken, storedUser] = await Promise.all([
                SecureStore.getItemAsync('userToken'),
                SecureStore.getItemAsync('userData')
            ]);
            
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }
        }
        loadStoredData();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {            
            const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
                email,
                password,
            });

            const { access_token: accessToken, user: userData } = response.data;

            // Sjekk om userData eksisterer og har riktig struktur
            if (!userData || !userData.id) {
                console.error('Uventet respons fra login API:', response.data);
                throw new Error('Uventet respons fra server');
            }

            setToken(accessToken);
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            // Lagre både token og brukerdata
            await Promise.all([
                SecureStore.setItemAsync('userToken', accessToken),
                SecureStore.setItemAsync('userData', JSON.stringify(userData))
            ]);
        } catch (error) {
            console.error('Feil ved innlogging:', error);
            throw error;
        }
    };

    const signOut = async () => {
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        await Promise.all([
            SecureStore.deleteItemAsync('userToken'),
            SecureStore.deleteItemAsync('userData')
        ]);
    };

    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
