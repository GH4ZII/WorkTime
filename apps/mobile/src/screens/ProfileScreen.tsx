// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions, TextInput, Modal } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
    const { user, changePassword } = useAuth();
    const navigation = useNavigation();
    
    // State for change password modal
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChangePassword = async () => {
        // Validering
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Feil', 'Alle feltene må fylles ut');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Feil', 'Nytt passord og bekreft passord må være like');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Feil', 'Nytt passord må være minst 6 tegn langt');
            return;
        }

        setIsChangingPassword(true);
        try {
            await changePassword(currentPassword, newPassword);
            Alert.alert('Suksess', 'Passordet ditt har blitt endret', [
                {
                    text: 'OK',
                    onPress: () => {
                        setIsChangePasswordModalVisible(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                    }
                }
            ]);
        } catch (error: any) {
            let errorMessage = 'Kunne ikke endre passord';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            Alert.alert('Feil', errorMessage);
        } finally {
            setIsChangingPassword(false);
        }
    };

    const openChangePasswordModal = () => {
        setIsChangePasswordModalVisible(true);
    };

    const closeChangePasswordModal = () => {
        setIsChangePasswordModalVisible(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
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
        <View style={styles.container}>
            <ScreenHeader 
                title="Min Profil" 
                subtitle="Administrer din konto og innstillinger"
            />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Info Section */}
                <View style={styles.profileSection}>
                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>Personlig informasjon</Text>
                    
                    <View style={styles.avatarSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || '?'}</Text>
                        </View>
                        <Text style={styles.avatarName}>{user?.name || 'Ukjent bruker'}</Text>
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

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>📱 Telefon</Text>
                        <Text style={styles.infoValue}>{user?.phone || 'Ikke satt'}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>📅 Ansettelsesdato</Text>
                        <Text style={styles.infoValue}>
                            {user?.hireDate ? new Date(user.hireDate).toLocaleDateString('nb-NO') : 'Ikke satt'}
                        </Text>
                    </View>
                </View>

                {/* Arbeidsinformasjon Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Arbeidsinformasjon</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Stillingsprosent:</Text>
                        <Text style={styles.infoValue}>{user?.positionPercentage || 100}%</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Maks timer per uke:</Text>
                        <Text style={styles.infoValue}>{user?.maxHoursPerWeek || 40}t</Text>
                    </View>
                </View>

                {/* Account Actions Section */}
                <View style={styles.actionsCard}>
                    <Text style={styles.sectionTitle}>Kontoinnstillinger</Text>
                    
                    <TouchableOpacity style={styles.actionButton} onPress={openChangePasswordModal}>
                        <Text style={styles.actionIcon}>🔒</Text>
                        <Text style={styles.actionText}>Endre passord</Text>
                        <Text style={styles.actionArrow}>›</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Info', 'Funksjonalitet kommer snart')}>
                        <Text style={styles.actionIcon}>⚙️</Text>
                        <Text style={styles.actionText}>Innstillinger</Text>
                        <Text style={styles.actionArrow}>›</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>📱</Text>
                        <Text style={styles.actionText}>Varsler</Text>
                        <Text style={styles.actionArrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={styles.actionIcon}>✏️</Text>
                        <Text style={styles.actionText}>Rediger profil</Text>
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
            </ScrollView>

            {/* Change Password Modal */}
            <Modal
                visible={isChangePasswordModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeChangePasswordModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Endre passord</Text>
                        
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Nåværende passord"
                            secureTextEntry={true}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholderTextColor="#9ca3af"
                        />
                        
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Nytt passord"
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholderTextColor="#9ca3af"
                        />
                        
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Bekreft nytt passord"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="#9ca3af"
                        />
                        
                        <View style={styles.passwordStrength}>
                            <Text style={styles.strengthText}>
                                Styrke: {newPassword.length < 6 ? 'Svak' : newPassword.length < 10 ? 'Middels' : 'Sterk'}
                            </Text>
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]} 
                                onPress={closeChangePasswordModal}
                                disabled={isChangingPassword}
                            >
                                <Text style={styles.cancelButtonText}>Avbryt</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.confirmButton]} 
                                onPress={handleChangePassword}
                                disabled={isChangingPassword}
                            >
                                <Text style={styles.confirmButtonText}>
                                    {isChangingPassword ? 'Endrer...' : 'Endre passord'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
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
    avatarSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#667eea',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#374151',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
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
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        width: width * 0.9,
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 20,
        textAlign: 'center',
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#ffffff',
        color: '#1f2937',
    },
    passwordStrength: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#f3f4f6',
        borderRadius: 6,
    },
    strengthText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    confirmButton: {
        backgroundColor: '#667eea',
    },
    cancelButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '500',
    },
    confirmButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ProfileScreen;
