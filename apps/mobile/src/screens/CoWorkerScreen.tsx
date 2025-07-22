import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoWorkerScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medarbeider</Text>
            <Text style={styles.subtitle}>Denne funksjonen er under utvikling.</Text>
        </View>
    );
}

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

export default CoWorkerScreen;
