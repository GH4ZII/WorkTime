import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { useAuth } from '../context/AuthContext';
import MyShiftsScreen from "../screens/MyShiftsScreen";
import ChatScreen from "../screens/ChatScreen";
import CoWorkerScreen from "../screens/CoWorkerScreen";
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AppDrawer() {
    return (
        <Drawer.Navigator 
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
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
            <Drawer.Screen
                name="Mine Skift"
                component={MyShiftsScreen}
                options={{
                    title: 'Mine Skift',
                }}
            />
            <Drawer.Screen
                name="Meldinger"
                component={ChatScreen}
                options={{
                    title: 'Meldinger',
                }}
            />
            <Drawer.Screen
                name="Medarbeidere"
                component={CoWorkerScreen}
                options={{
                    title: 'Medarbeidere',
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
