// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
    const { signOut } = useAuth();
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Du er logget inn!</Text>
            <Button title="Logg ut" onPress={signOut} />
        </View>
    );
};
export default ProfileScreen;
