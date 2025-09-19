import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {

    return (
        <PaperProvider>
            <AuthProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </AuthProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent('WorkTime', () => App);
