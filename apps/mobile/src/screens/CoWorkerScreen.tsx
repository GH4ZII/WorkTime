import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { API_ENDPOINTS } from '../config/api-simple';

const { width } = Dimensions.get('window');

// Interface for en medarbeider
interface CoWorker {
    id: string;
    name: string;
    email: string;
    role: string;
}

const CoWorkerScreen: React.FC = () => {
    // State-variabler for data, lasting og feil
    const [coWorkers, setCoWorkers] = useState<CoWorker[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Vi definerer en async funksjon inne i useEffect for å hente data
        const fetchCoWorkers = async () => {
            try {
                // 1. Vent på at fetch skal fullføre
                const response = await fetch(API_ENDPOINTS.USERS);
                if (!response.ok) {
                    // Kast en feil hvis serveren svarer med en feilkode (f.eks. 404, 500)
                    throw new Error('Klarte ikke å hente medarbeidere. Sjekk nettverksforbindelsen.');
                }
                // 2. Vent på at responsen skal konverteres fra JSON
                const data: CoWorker[] = await response.json();

                // 3. Sorter dataen alfabetisk basert på navn
                const sortedData = [...data].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                // 4. Oppdater state med den sorterte dataen
                setCoWorkers(sortedData);

            } catch (e: any) {
                // Hvis noe går galt, lagre feilmeldingen
                setError(e.message);
            } finally {
                // Uansett resultat, slutt å vise lasteindikatoren
                setIsLoading(false);
            }
        };

        // Kjør funksjonen vi nettopp definerte
        fetchCoWorkers();
    }, []); // Tom dependency-array betyr at dette kun kjører én gang

    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
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
        switch (role.toLowerCase()) {
            case 'admin':
                return '#e74c3c';
            case 'manager':
                return '#f39c12';
            case 'supervisor':
                return '#3498db';
            case 'employee':
                return '#27ae60';
            default:
                return '#95a5a6';
        }
    };

    const formatRole = (role: string) => {
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    };

    // Viser en lasteindikator mens data hentes
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Medarbeidere</Text>
                    <Text style={styles.headerSubtitle}>Oversikt over teamet</Text>
                </View>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3498db" />
                    <Text style={styles.loadingText}>Laster medarbeidere...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Viser en feilmelding hvis noe gikk galt
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Medarbeidere</Text>
                    <Text style={styles.headerSubtitle}>Oversikt over teamet</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>Feil: {error}</Text>
                    <TouchableOpacity style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Prøv igjen</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Funksjon for å rendre hvert element i listen
    const renderItem = ({ item }: { item: CoWorker }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {item.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Text>
                </View>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemEmail}>{item.email}</Text>
                </View>
                <View style={[styles.roleBadge, { backgroundColor: getRoleColor(item.role) }]}>
                    <Text style={styles.roleIcon}>{getRoleIcon(item.role)}</Text>
                    <Text style={styles.roleText}>{formatRole(item.role)}</Text>
                </View>
            </View>
        </View>
    );

    // Viser listen med medarbeidere når data er hentet
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Medarbeidere</Text>
                <Text style={styles.headerSubtitle}>Oversikt over teamet</Text>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>{coWorkers.length} medarbeidere</Text>
                </View>
            </View>
            
            <FlatList
                data={coWorkers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

// Oppdaterte stiler for listen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#3498db',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#ecf0f1',
        marginBottom: 16,
    },
    statsContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    statsText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#7f8c8d',
    },
    errorIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#e74c3c',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    list: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
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
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    itemEmail: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        minWidth: 80,
    },
    roleIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    roleText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
});

export default CoWorkerScreen;
