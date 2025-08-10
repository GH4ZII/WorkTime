import React, { useState, useEffect } from 'react';
import { 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Text, 
    View, 
    Alert, 
    ActivityIndicator, 
    KeyboardAvoidingView, 
    Platform,
    ScrollView,
    Dimensions
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();

    // Load saved credentials on component mount
    useEffect(() => {
        loadSavedCredentials();
    }, []);

    const loadSavedCredentials = async () => {
        try {
            const savedEmail = await SecureStore.getItemAsync('rememberedEmail');
            const savedPassword = await SecureStore.getItemAsync('rememberedPassword');
            if (savedEmail && savedPassword) {
                setEmail(savedEmail);
                setPassword(savedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            console.log('Could not load saved credentials');
        }
    };

    const saveCredentials = async () => {
        try {
            if (rememberMe) {
                await SecureStore.setItemAsync('rememberedEmail', email);
                await SecureStore.setItemAsync('rememberedPassword', password);
            } else {
                await SecureStore.deleteItemAsync('rememberedEmail');
                await SecureStore.deleteItemAsync('rememberedPassword');
            }
        } catch (error) {
            console.log('Could not save credentials');
        }
    };

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Feil', 'Vennligst fyll ut både e-post og passord');
            return;
        }

        if (loading) return;

        setLoading(true);
        try {
            await signIn(email, password);
            await saveCredentials();
        } catch (error) {
            Alert.alert("Innlogging feilet", error.message || "Kunne ikke logge inn");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoIcon}>⏰</Text>
                        <Text style={styles.title}>WorkTime</Text>
                        <Text style={styles.subtitle}>Administrer dine vakter enkelt</Text>
                    </View>
                </View>

                {/* Login Form Section */}
                <View style={styles.formSection}>
                    <Text style={styles.formTitle}>Logg inn</Text>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>E-post</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Skriv inn din e-post"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Passord</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Skriv inn ditt passord"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Remember Me Section */}
                    <TouchableOpacity 
                        style={styles.rememberMeContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.rememberMeText}>Husk meg</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Logg inn</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Footer Section */}
                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>
                        Velkommen tilbake til WorkTime
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerSection: {
        paddingTop: 60,
        paddingBottom: 40,
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoIcon: {
        fontSize: 60,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
    formSection: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1.5,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#f9fafb',
        color: '#374151',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#667eea',
        borderRadius: 4,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#667eea',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    rememberMeText: {
        fontSize: 16,
        color: '#374151',
    },
    loginButton: {
        backgroundColor: '#667eea',
        height: 54,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#667eea',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    loginButtonDisabled: {
        backgroundColor: '#bdc3c7',
        shadowOpacity: 0,
        elevation: 0,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    footerSection: {
        paddingTop: 32,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
});

export default LoginScreen;
