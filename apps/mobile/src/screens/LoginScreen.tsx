import React, { useState } from 'react';
// Vi importerer Alert for å vise feilmeldinger og ActivityIndicator for å vise en spinner
import { TextInput, Button, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
// NYTT: Importer den egendefinerte hook-en vår for å få tilgang til contexten
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // NYTT: Hent innloggingsfunksjonen fra vår AuthContext
    const { signIn } = useAuth();

    // NYTT: En state for å holde styr på om vi laster, for å hindre spam-klikking på knappen
    const [loading, setLoading] = useState(false);

    // NYTT: Oppdatert handleLogin for å være asynkron og kalle signIn
    const handleLogin = async () => {
        if (loading) return; // Ikke gjør noe hvis vi allerede laster

        setLoading(true);
        try {
            // Kall signIn-funksjonen fra AuthContext med e-post og passord
            await signIn(email, password);
            // Hvis dette kallet er vellykket, vil AuthContext og AppNavigator
            // automatisk bytte til appens hovedskjerm. Du trenger ikke gjøre mer her!
        } catch (error) {
            // Hvis signIn feiler (f.eks. feil passord), vis en feilmelding
            Alert.alert("Innlogging feilet", error.message);
        } finally {
            // Uansett om det feilet eller ikke, sett loading til false igjen
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WorkTime</Text>
            <TextInput
                style={styles.input}
                placeholder="E-post"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Passord"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* NYTT: Vis enten en spinner eller knappen, basert på loading-staten */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Logg inn" onPress={handleLogin} />
            )}
        </View>
    );
};

// Styles er de samme som før...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LoginScreen;
