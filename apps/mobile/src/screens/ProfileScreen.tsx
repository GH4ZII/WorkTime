// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const ProfileScreen: React.FC = () => {
    const { signOut } = useAuth();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Du er logget inn!</Text>
            <Text>Name:</Text>
            <Text>e-mail</Text>
            <Text>Role:</Text>
            <Text>Change Password</Text>
            <Button mode={"contained-tonal"}
                    onPress={signOut}>
                    Logg ut
        </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
});
export default ProfileScreen;
