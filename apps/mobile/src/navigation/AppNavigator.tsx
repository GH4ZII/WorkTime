// apps/mobile/src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Importer drawer
import ProfileScreen from '../screens/ProfileScreen';

// 1. Lag en instans av Drawer Navigator
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// 2. Definer din eksisterende Tab-navigator som en egen komponent
function HomeTabs() {
    return (
        <Tab.Navigator>
            {/* Her kan du ha flere faner, f.eks. Hjem, Vaktliste etc.
        Jeg legger bare inn ProfileScreen som et eksempel.
      */}
            <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profil' }} />
        </Tab.Navigator>
    );
}

// 3. Sett opp AppNavigator til å bruke Drawer
export default function AppNavigator() {
    return (
        // Bruk Drawer.Navigator som den ytre navigatoren
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={HomeTabs} // Hele Tab-navigatoren er nå én skjerm i draweren
                options={{
                    title: 'Hjem', // Tittel i header og drawer
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen} // Du kan også ha direktelenker til skjermer
                options={{
                    title: 'Min Profil',
                }}
            />
            {/* Legg til flere skjermer her som skal vises i hamburgermenyen */}
        </Drawer.Navigator>
    );
}
