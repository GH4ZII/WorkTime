import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig, DateData } from "react-native-calendars";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api-simple";
import ScreenHeader from "../components/ScreenHeader";

const { width } = Dimensions.get('window');

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
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
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
    duration: number;
    description?: string;
    location?: string;
    status: ShiftStatus;
}

const HomeScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [allShifts, setAllShifts] = useState<ProcessedShift[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7)); // Format: YYYY-MM

    useEffect(() => {
        const fetchAndProcessShifts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await axios.get<RawShiftFromAPI[]>(API_ENDPOINTS.SHIFTS);

                const processed: ProcessedShift[] = response.data.map((raw) => {
                    const start = new Date(raw.startTime);
                    const end = new Date(raw.endTime);
                    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

                    return {
                        id: raw.id,
                        userId: raw.userId,
                        userName: raw.user?.name,
                        date: start.toISOString().split("T")[0],
                        startTime: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        endTime: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        duration: durationHours,
                        description: raw.notes || "",
                        location: raw.location || "",
                        status: raw.status,
                    };
                });

                setAllShifts(processed);
            } catch (err) {
                console.error("❌ Error fetching shifts:", err);
                if (err.response) {
                    console.error("Response status:", err.response.status);
                    console.error("Response data:", err.response.data);
                }
                setError(`Kunne ikke hente skift: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndProcessShifts();
    }, []);

    // Memoized kalkulering for totale timer i den viste måneden
    const totalHoursForMonth = useMemo(() => {
        const approvedShiftsInMonth = allShifts.filter(shift =>
            shift.date.startsWith(currentMonth) && shift.status === ShiftStatus.APPROVED
        );
        const total = approvedShiftsInMonth.reduce((sum, shift) => sum + shift.duration, 0);
        return total.toFixed(1);
    }, [allShifts, currentMonth]);

    // Alle skift for valgt dato
    const shiftsForSelectedDate = useMemo(
        () => allShifts.filter((s) => s.date === selectedDate),
        [allShifts, selectedDate]
    );

    // Markeringer i kalender (multi-dot for flere skift på samme dato)
    const markedDates = useMemo(() => {
        const m: Record<string, any> = {};

        allShifts.forEach((shift) => {
            if (!m[shift.date]) m[shift.date] = { dots: [] };
            m[shift.date].dots.push({
                key: shift.id,
                color: shift.status === ShiftStatus.APPROVED ? "#27ae60" : "#f39c12",
            });
        });

        if (selectedDate) {
            m[selectedDate] = {
                ...(m[selectedDate] || { dots: [] }),
                selected: true,
                selectedColor: "#3498db",
            };
        }

        return m;
    }, [allShifts, selectedDate]);

    const getStatusColor = (status: ShiftStatus) => {
        switch (status) {
            case ShiftStatus.APPROVED:
                return "#10b981"; // Green
            case ShiftStatus.PENDING:
                return "#f59e0b"; // Amber
            case ShiftStatus.REJECTED:
                return "#ef4444"; // Red
            default:
                return "#6b7280"; // Gray
        }
    };

    const getStatusText = (status: ShiftStatus) => {
        switch (status) {
            case ShiftStatus.APPROVED:
                return "Godkjent";
            case ShiftStatus.PENDING:
                return "Venter";
            case ShiftStatus.REJECTED:
                return "Avvist";
            default:
                return status;
        }
    };

    const renderShiftDetails = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3498db" />
                    <Text style={styles.loadingText}>Laster skift...</Text>
                </View>
            );
        }
        
        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Prøv igjen</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        
        if (!selectedDate) {
            return (
                <View style={styles.infoContainer}>
                    <Text style={styles.infoIcon}>📅</Text>
                    <Text style={styles.infoText}>Trykk på en dato for å se detaljer</Text>
                </View>
            );
        }

        if (shiftsForSelectedDate.length === 0) {
            return (
                <View style={styles.infoContainer}>
                    <Text style={styles.infoIcon}>📝</Text>
                    <Text style={styles.infoText}>Ingen vakt registrert denne dagen</Text>
                </View>
            );
        }

        return (
            <View style={styles.shiftsContainer}>
                <Text style={styles.shiftDate}>Vakter {selectedDate}</Text>
                <Text style={styles.shiftCount}>{shiftsForSelectedDate.length} vakt(er)</Text>

                {shiftsForSelectedDate.map((shift) => (
                    <View key={shift.id} style={styles.shiftCard}>
                        <View style={styles.shiftHeader}>
                            <View style={styles.timeContainer}>
                                <Text style={styles.shiftTime}>
                                    {shift.startTime} - {shift.endTime}
                                </Text>
                                <Text style={styles.shiftDuration}>{shift.duration.toFixed(1)} timer</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(shift.status) }]}>
                                <Text style={styles.statusText}>{getStatusText(shift.status)}</Text>
                            </View>
                        </View>
                        
                        {shift.userName && (
                            <View style={styles.shiftDetail}>
                                <Text style={styles.detailLabel}>👤 Ansatt:</Text>
                                <Text style={styles.detailValue}>{shift.userName}</Text>
                            </View>
                        )}
                        
                        {shift.location && (
                            <View style={styles.shiftDetail}>
                                <Text style={styles.detailLabel}>📍 Sted:</Text>
                                <Text style={styles.detailValue}>{shift.location}</Text>
                            </View>
                        )}
                        
                        {shift.description && (
                            <View style={styles.shiftDetail}>
                                <Text style={styles.detailLabel}>📝 Notat:</Text>
                                <Text style={styles.detailValue}>{shift.description}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScreenHeader 
                title="Hjem" 
                subtitle="Oversikt over dine vakter og arbeidstid"
            />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Calendar Section */}
                <View style={styles.calendarContainer}>
                <Calendar
                    style={styles.calendar}
                    onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                    onMonthChange={(month) => setCurrentMonth(month.dateString.slice(0, 7))}
                    markedDates={markedDates}
                    markingType="multi-dot"
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#374151',
                        selectedDayBackgroundColor: '#667eea',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#667eea',
                        dayTextColor: '#374151',
                        textDisabledColor: '#d1d5db',
                        dotColor: '#667eea',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#667eea',
                        monthTextColor: '#374151',
                        indicatorColor: '#667eea',
                        textDayFontWeight: '400',
                        textMonthFontWeight: '600',
                        textDayHeaderFontWeight: '500',
                        textDayFontSize: 16,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 14,
                    }}
                />
            </View>

            {/* Summary Section */}
            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Arbeid denne måneden</Text>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#3498db" />
                    ) : (
                        <Text style={styles.summaryHours}>{totalHoursForMonth} timer</Text>
                    )}
                </View>
            </View>

            {/* Details Section */}
            <View style={styles.detailsContainer}>
                {renderShiftDetails()}
            </View>
            </ScrollView>
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
    calendarContainer: {
        backgroundColor: '#ffffff',
        margin: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    calendar: {
        borderBottomWidth: 0,
    },
    summaryContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    summaryCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    summaryHours: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#667eea',
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6b7280',
    },
    errorContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    errorIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    retryButton: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    infoContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    infoIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    infoText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    shiftsContainer: {
        gap: 16,
    },
    shiftDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 4,
    },
    shiftCount: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
    },
    shiftCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    shiftHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    timeContainer: {
        flex: 1,
    },
    shiftTime: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    shiftDuration: {
        fontSize: 14,
        color: '#6b7280',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        minWidth: 80,
        alignItems: 'center',
    },
    statusText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    shiftDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#7f8c8d',
        marginRight: 8,
        minWidth: 60,
    },
    detailValue: {
        fontSize: 14,
        color: '#2c3e50',
        flex: 1,
    },
});

export default HomeScreen;
