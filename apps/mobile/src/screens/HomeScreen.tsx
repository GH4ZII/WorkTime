import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Calendar, LocaleConfig, DateData } from "react-native-calendars";
import axios from "axios";

// Norsk språk i kalender
LocaleConfig.locales["no"] = {
    monthNames: [
        "Januar",
        "Februar",
        "Mars",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Desember",
    ],
    monthNamesShort: ["Jan.", "Feb.", "Mars", "April", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Des."],
    dayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    dayNamesShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
    today: "I dag",
};
LocaleConfig.defaultLocale = "no";

enum ShiftStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
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
    user?: { id: string; name: string; email?: string };
}

interface ProcessedShift {
    id: string;
    userId: string;
    userName?: string;
    date: string;        // YYYY-MM-DD
    startTime: string;   // HH:MM
    endTime: string;     // HH:MM
    description?: string;
    location?: string;
    status: ShiftStatus;
}

const HomeScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [allShifts, setAllShifts] = useState<ProcessedShift[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndProcessShifts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await axios.get<RawShiftFromAPI[]>("http://10.129.48.163:3001/shifts");

                const processed: ProcessedShift[] = response.data.map((raw) => {
                    const start = new Date(raw.startTime);
                    const end = new Date(raw.endTime);

                    return {
                        id: raw.id,
                        userId: raw.userId,
                        userName: raw.user?.name,
                        date: start.toISOString().split("T")[0],
                        startTime: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        endTime: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        description: raw.notes || "",
                        location: raw.location || "",
                        status: raw.status,
                    };
                });

                setAllShifts(processed);
            } catch (err) {
                console.error("Error fetching shifts:", err);
                setError("Kunne ikke hente skift. Vennligst prøv igjen senere.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndProcessShifts();
    }, []);

    // Alle skift for valgt dato
    const shiftsForSelectedDate = useMemo(
        () => allShifts.filter((s) => s.date === selectedDate),
        [allShifts, selectedDate]
    );

    // Kollegaliste
    const coworkers = useMemo(() => {
        const names = shiftsForSelectedDate.map((s) => s.userName).filter(Boolean) as string[];
        return Array.from(new Set(names));
    }, [shiftsForSelectedDate]);

    // Markeringer i kalender (multi-dot for flere skift på samme dato)
    const markedDates = useMemo(() => {
        const m: Record<string, any> = {};

        allShifts.forEach((shift) => {
            if (!m[shift.date]) m[shift.date] = { dots: [] };
            m[shift.date].dots.push({
                key: shift.id,
                color: shift.status === ShiftStatus.APPROVED ? "#1E90FF" : "#FFA500",
            });
        });

        if (selectedDate) {
            m[selectedDate] = {
                ...(m[selectedDate] || { dots: [] }),
                selected: true,
                selectedColor: "#1E90FF",
            };
        }

        return m;
    }, [allShifts, selectedDate]);

    const renderShiftDetails = () => {
        if (isLoading) return <ActivityIndicator size="large" color="#5E84E2" style={styles.infoContainer} />;
        if (error) return <Text style={[styles.infoText, styles.errorText]}>{error}</Text>;
        if (!selectedDate) return <Text style={styles.infoText}>Trykk på en dato for å se detaljer.</Text>;

        if (shiftsForSelectedDate.length === 0) {
            return <Text style={styles.infoText}>Ingen vakt registrert denne dagen.</Text>;
        }

        return (
            <View style={{ gap: 12 }}>
                <Text style={styles.shiftDate}>Vakter {selectedDate}</Text>

                {shiftsForSelectedDate.map((shift) => (
                    <View key={shift.id} style={styles.shiftCard}>
                        <Text style={styles.shiftTime}>
                            {shift.startTime} - {shift.endTime}
                        </Text>
                        {shift.userName && <Text style={styles.shiftDescription}>Ansatt: {shift.userName}</Text>}
                        {shift.location && <Text style={styles.shiftDescription}>Sted: {shift.location}</Text>}
                        {shift.description && <Text style={styles.shiftDescription}>Notat: {shift.description}</Text>}
                        <Text style={[styles.shiftDescription, styles.status]}>Status: {shift.status.toUpperCase()}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Calendar
                style={styles.calendar}
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                markingType="multi-dot"
            />
            <View style={styles.detailsContainer}>{renderShiftDetails()}</View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    calendar: { borderBottomWidth: 1, borderColor: "#e0e0e0" },
    detailsContainer: { padding: 20 },
    infoContainer: { marginTop: 20 },
    infoText: { textAlign: "center", fontSize: 16, color: "#666", marginTop: 20 },
    errorText: { color: "red" },

    shiftDate: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
    coworkers: { fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#333" },

    shiftCard: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    shiftTime: { fontSize: 16, marginBottom: 8 },
    shiftDescription: { fontSize: 14, color: "#555", marginBottom: 4 },
    status: { marginTop: 8, fontWeight: "bold" },
});

export default HomeScreen;
