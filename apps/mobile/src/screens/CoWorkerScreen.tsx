import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

// Interface for en medarbeider
interface CoWorker {
    id: string;
    name: string;
    email: string;
    role: string;
}

// URL til ditt API. Sørg for at denne IP-adressen er korrekt.
const API_URL = 'http://10.129.48.163:3001/users';

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
                const response = await fetch(API_URL);
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

    // Viser en lasteindikator mens data hentes
    if (isLoading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Laster medarbeidere...</Text>
            </SafeAreaView>
        );
    }

    // Viser en feilmelding hvis noe gikk galt
    if (error) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.errorText}>Feil: {error}</Text>
            </SafeAreaView>
        );
    }

    // Funksjon for å rendre hvert element i listen
    const renderItem = ({ item }: { item: CoWorker }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemRole}>{item.role}</Text>
            <Text style={styles.itemEmail}>{item.email}</Text>
        </View>
    );

    // Viser listen med medarbeidere når data er hentet
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Medarbeidere</Text>
            <FlatList
                data={coWorkers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

// Oppdaterte stiler for listen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    list: {
        paddingHorizontal: 16,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600', // semi-bold
    },
    itemRole: {
        fontSize: 15,
        color: '#555',
        textTransform: 'capitalize',
        marginTop: 4,
    },
    itemEmail: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default CoWorkerScreen;
