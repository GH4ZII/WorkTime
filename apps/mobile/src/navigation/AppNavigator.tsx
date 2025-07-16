import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AppDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Hjem',
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Min Profil',
                }}
            />
        </Drawer.Navigator>
    );
}

export default function AppNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        <Stack.Navigator>
            {isAuthenticated ? (
                <Stack.Screen
                    name="App"
                    component={AppDrawer}
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: 'Logg inn', headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
}
