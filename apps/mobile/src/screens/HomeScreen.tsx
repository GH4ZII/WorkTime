import React, {useEffect, useMemo} from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Calendar, LocaleConfig, DateData } from "react-native-calendars";
import axios from "axios"; // Importer axios for API-kall

// Konfigurerer kalenderen til å bruke norske navn for måneder og dager
LocaleConfig.locales['no'] = {
    monthNames: ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
    monthNamesShort: ['Jan.','Feb.','Mars','April','Mai','Juni','Juli','Aug.','Sep.','Okt.','Nov.','Des.'],
    dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
    dayNamesShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
    today: 'I dag'
};
LocaleConfig.defaultLocale = 'no';

enum ShiftStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

interface RawShiftFromAPI {
    id: string;
    userId: string;
    startTime: string;
    endTime: string;
    location?: string;
    notes?: string;
    status: ShiftStatus;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

interface ProcessedShift {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    description?: string;
    location?: string;
    status: ShiftStatus;
}

const HomeScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = React.useState('');
    const [allShifts, setAllShifts] = React.useState<ProcessedShift[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchAndProcessShifts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const respone = await axios.get<RawShiftFromAPI[]>('http://10.130.50.26:3001/shifts');

                const processedData: ProcessedShift[] = respone.data.map(rawShift => {
                    const startDate = new Date(rawShift.startTime);
                    const endDate = new Date(rawShift.endTime);

                    return {
                        id: rawShift.id,
                        date: startDate.toISOString().split('T')[0], // Format YYYY-MM-DD
                        startTime: startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format HH:MM
                        endTime: endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format HH:MM
                        description: rawShift.notes || '',
                        location: rawShift.location || '',
                        status: rawShift.status,
                    };
                });
                setAllShifts(processedData);
            } catch (err) {
                console.error("Error fetching shifts:", err);
                setError("Kunne ikke hente skift. Vennligst prøv igjen senere.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAndProcessShifts();
    }, []);

    const markedDates = useMemo(() => {
        const markings = {}; // Oppretter et tomt objekt som skal holde markeringene for datoene

        allShifts.forEach(shift => { // Går gjennom alle skiftene
            markings[shift.date] = { marked: true, dotColor: '#1E90FF' }; // Markerer datoen med en blå prikk (dot)
        });

        if (selectedDate) { // Hvis en dato er valgt
            markings[selectedDate] = { ...markings[selectedDate], selected: true, selectedColor: '#1E90FF' };
            // Legger til ekstra markering på valgt dato: beholder eventuell eksisterende dot og markerer datoen som valgt med blå farge
        }

        return markings; // Returnerer det ferdige objektet med dato-markeringer
    }, [allShifts, selectedDate]); // Beregningen kjører kun på nytt når allShifts eller selectedDate endres

const shiftForSelectedDate = allShifts.find(shift => shift.date === selectedDate);

    const renderShiftDetails = () => {
        if (isLoading) return <ActivityIndicator size="large" color="#5E84E2" style={styles.infoContainer} />;
        if (error) return <Text style={[styles.infoText, styles.errorText]}>{error}</Text>;
        if (!selectedDate) return <Text style={styles.infoText}>Trykk på en dato for å se detaljer.</Text>;

        if (shiftForSelectedDate) {
            return (
                <View style={styles.shiftCard}>
                    <Text style={styles.shiftDate}>Vakt for {selectedDate}</Text>
                    <Text style={styles.shiftTime}>
                        Klokken: {shiftForSelectedDate.startTime} - {shiftForSelectedDate.endTime}
                    </Text>
                    {shiftForSelectedDate.location && (
                        <Text style={styles.shiftDescription}>
                            Sted: {shiftForSelectedDate.location}
                        </Text>
                    )}
                    {shiftForSelectedDate.description && (
                        <Text style={styles.shiftDescription}>
                            Notat: {shiftForSelectedDate.description}
                        </Text>
                    )}
                    <Text style={[styles.shiftDescription, styles.status]}>
                        Status: {shiftForSelectedDate.status}
                    </Text>
                </View>
            );
        }
        return <Text style={styles.infoText}>Ingen vakt registrert denne dagen.</Text>;
    };

    return (
        <ScrollView style={styles.container}>
            <Calendar
                style={styles.calendar}
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
            />
            <View style={styles.detailsContainer}>
                {renderShiftDetails()}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    calendar: { borderBottomWidth: 1, borderColor: '#e0e0e0' },
    detailsContainer: { padding: 20 },
    infoContainer: { marginTop: 20 },
    infoText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
    errorText: { color: 'red' },
    shiftCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    shiftDate: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    shiftTime: { fontSize: 16, marginBottom: 8 },
    shiftDescription: { fontSize: 14, color: '#555', marginBottom: 4 },
    status: {
        marginTop: 8,
        fontWeight: 'bold'
    }
});

export default HomeScreen;
