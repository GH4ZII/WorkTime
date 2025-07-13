import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
    const { isAuthenticated } = useAuth(); // Hent innloggingsstatus

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    // Vis disse skjermene hvis brukeren er logget inn
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                ) : (
                    // Ellers, vis kun LoginScreen
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
