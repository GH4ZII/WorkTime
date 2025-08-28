import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { AppRegistry } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import PushNotificationService from './src/services/PushNotificationService';
import * as Notifications from 'expo-notifications';

export default function App() {
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        // Initialiser push-notifikasjoner
        const initializePushNotifications = async () => {
            try {
                await PushNotificationService.getInstance().initialize();
            } catch (error) {
                console.error('Failed to initialize push notifications:', error);
            }
        };

        initializePushNotifications();

        // Håndter notifikasjoner når appen er i forgrunnen
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received in foreground:', notification);
        });

        // Håndter når bruker klikker på notifikasjon
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification response received:', response);
            
            // Håndter dyplenking basert på data
            const data = response.notification.request.content.data;
            if (data?.shiftId) {
                // Dette vil bli håndtert av navigation context senere
                console.log('Deep linking to shift:', data.shiftId);
            }
        });

        // Cleanup
        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
            PushNotificationService.getInstance().cleanup();
        };
    }, []);

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
