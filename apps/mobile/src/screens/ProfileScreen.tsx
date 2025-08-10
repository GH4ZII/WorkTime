// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
    const { signOut, user } = useAuth();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        Alert.alert(
            'Logg ut',
            'Er du sikker på at du vil logge ut?',
            [
                {
                    text: 'Avbryt',
                    style: 'cancel',
                },
                {
                    text: 'Logg ut',
                    style: 'destructive',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            await signOut();
                        } catch (error) {
                            Alert.alert('Feil', 'Kunne ikke logge ut');
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ]
        );
    };

    const getRoleIcon = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return '👑';
            case 'manager':
                return '👔';
            case 'supervisor':
                return '📋';
            case 'employee':
                return '👷';
            default:
                return '👤';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return '#ef4444'; // Red
            case 'manager':
                return '#f59e0b'; // Amber
            case 'supervisor':
                return '#667eea'; // Theme blue
            case 'employee':
                return '#10b981'; // Green
            default:
                return '#6b7280'; // Gray
        }
    };

    const formatRole = (role: string) => {
        if (!role) return 'Ikke satt';
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    <Text style={styles.profileImageText}>
                        {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                    </Text>
                </View>
                <Text style={styles.headerTitle}>Min Profil</Text>
                <Text style={styles.headerSubtitle}>Administrer din konto</Text>
            </View>

            {/* Profile Info Section */}
            <View style={styles.profileSection}>
                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>Personlig informasjon</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>👤 Navn</Text>
                        <Text style={styles.infoValue}>{user?.name || 'Ikke satt'}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>📧 E-post</Text>
                        <Text style={styles.infoValue}>{user?.email || 'Ikke satt'}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>🎭 Rolle</Text>
                        <View style={styles.roleContainer}>
                            <Text style={styles.roleIcon}>{getRoleIcon(user?.role)}</Text>
                            <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user?.role) }]}>
                                <Text style={styles.roleText}>{formatRole(user?.role)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Account Actions Section */}
                <View style={styles.actionsCard}>
                    <Text style={styles.sectionTitle}>Kontoinnstillinger</Text>
                    
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>🔒</Text>
                        <Text style={styles.actionText}>Endre passord</Text>
                        <Text style={styles.actionArrow}>›</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>⚙️</Text>
                        <Text style={styles.actionText}>Innstillinger</Text>
                        <Text style={styles.actionArrow}>›</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>📱</Text>
                        <Text style={styles.actionText}>Varsler</Text>
                        <Text style={styles.actionArrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* App Info Section */}
                <View style={styles.appInfoCard}>
                    <Text style={styles.sectionTitle}>Om appen</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>📱 Versjon</Text>
                        <Text style={styles.infoValue}>1.0.0</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>🏢 Utviklet av</Text>
                        <Text style={styles.infoValue}>WorkTime Team</Text>
                    </View>
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity
                    style={[styles.signOutButton, isLoading && styles.signOutButtonDisabled]}
                    onPress={handleSignOut}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signOutButtonText}>
                        {isLoading ? 'Logger ut...' : 'Logg ut'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#667eea',
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    profileImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    profileImageText: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#ecf0f1',
    },
    profileSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    infoCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    infoLabel: {
        fontSize: 16,
        color: '#6b7280',
        flex: 1,
    },
    infoValue: {
        fontSize: 16,
        color: '#2c3e50',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    roleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    roleIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    roleBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        minWidth: 80,
        alignItems: 'center',
    },
    roleText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    actionsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    actionIcon: {
        fontSize: 20,
        marginRight: 16,
        width: 24,
        textAlign: 'center',
    },
    actionText: {
        fontSize: 16,
        color: '#2c3e50',
        flex: 1,
    },
    actionArrow: {
        fontSize: 20,
        color: '#bdc3c7',
        fontWeight: 'bold',
    },
    appInfoCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    signOutButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#e74c3c',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    signOutButtonDisabled: {
        backgroundColor: '#bdc3c7',
        shadowOpacity: 0,
        elevation: 0,
    },
    signOutButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ProfileScreen;
