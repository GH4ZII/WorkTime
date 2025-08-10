import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { API_ENDPOINTS } from '../config/api-simple';
import axios from 'axios';

const { width } = Dimensions.get('window');

interface Shift {
    id: string;
    startTime: string;
    endTime: string;
    location?: string;
    notes?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
}

const MyShiftsScreen: React.FC = () => {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'past'>('all');

    useEffect(() => {
        fetchMyShifts();
    }, []);

    const fetchMyShifts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Her ville du normalt hente kun brukerens egne vakter
            const response = await axios.get(API_ENDPOINTS.SHIFTS);
            const userShifts = response.data.slice(0, 5); // Simulerer brukerens vakter
            
            setShifts(userShifts);
        } catch (err: any) {
            console.error('Error fetching shifts:', err);
            setError('Kunne ikke hente dine vakter');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return '#27ae60';
            case 'PENDING':
                return '#f39c12';
            case 'REJECTED':
                return '#e74c3c';
            default:
                return '#95a5a6';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return 'Godkjent';
            case 'PENDING':
                return 'Venter';
            case 'REJECTED':
                return 'Avvist';
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('nb-NO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('nb-NO', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const calculateDuration = (start: string, end: string) => {
        const startTime = new Date(start);
        const endTime = new Date(end);
        const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        return duration.toFixed(1);
    };

    const filteredShifts = shifts.filter(shift => {
        const now = new Date();
        const shiftDate = new Date(shift.startTime);
        
        switch (selectedFilter) {
            case 'upcoming':
                return shiftDate > now;
            case 'past':
                return shiftDate < now;
            default:
                return true;
        }
    });

    const renderShiftCard = (shift: Shift) => (
        <View key={shift.id} style={styles.shiftCard}>
            <View style={styles.shiftHeader}>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.shiftDate}>{formatDate(shift.startTime)}</Text>
                    <Text style={styles.shiftTime}>
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                    </Text>
                    <Text style={styles.shiftDuration}>
                        {calculateDuration(shift.startTime, shift.endTime)} timer
                    </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(shift.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(shift.status)}</Text>
                </View>
            </View>
            
            {shift.location && (
                <View style={styles.shiftDetail}>
                    <Text style={styles.detailIcon}>📍</Text>
                    <Text style={styles.detailText}>{shift.location}</Text>
                </View>
            )}
            
            {shift.notes && (
                <View style={styles.shiftDetail}>
                    <Text style={styles.detailIcon}>📝</Text>
                    <Text style={styles.detailText}>{shift.notes}</Text>
                </View>
            )}
        </View>
    );

    const renderFilterButton = (filter: 'all' | 'upcoming' | 'past', label: string) => (
        <TouchableOpacity
            style={[styles.filterButton, selectedFilter === filter && styles.filterButtonActive]}
            onPress={() => setSelectedFilter(filter)}
            activeOpacity={0.8}
        >
            <Text style={[styles.filterButtonText, selectedFilter === filter && styles.filterButtonTextActive]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Mine Vakter</Text>
                    <Text style={styles.headerSubtitle}>Oversikt over dine vakter</Text>
                </View>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3498db" />
                    <Text style={styles.loadingText}>Laster dine vakter...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Mine Vakter</Text>
                    <Text style={styles.headerSubtitle}>Oversikt over dine vakter</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchMyShifts}>
                        <Text style={styles.retryButtonText}>Prøv igjen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mine Vakter</Text>
                <Text style={styles.headerSubtitle}>Oversikt over dine vakter</Text>
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                {renderFilterButton('all', 'Alle')}
                {renderFilterButton('upcoming', 'Kommende')}
                {renderFilterButton('past', 'Tidligere')}
            </View>

            {/* Shifts List */}
            <ScrollView 
                style={styles.shiftsContainer}
                contentContainerStyle={styles.shiftsContent}
                showsVerticalScrollIndicator={false}
            >
                {filteredShifts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📅</Text>
                        <Text style={styles.emptyText}>Ingen vakter funnet</Text>
                        <Text style={styles.emptySubtext}>
                            {selectedFilter === 'upcoming' 
                                ? 'Du har ingen kommende vakter'
                                : selectedFilter === 'past'
                                ? 'Du har ingen tidligere vakter'
                                : 'Du har ingen vakter registrert'
                            }
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.shiftsCount}>
                            {filteredShifts.length} vakt{filteredShifts.length !== 1 ? 'er' : ''} funnet
                        </Text>
                        {filteredShifts.map(renderShiftCard)}
                    </>
                )}
            </ScrollView>
        </View>
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
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 12,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e1e8ed',
    },
    filterButtonActive: {
        backgroundColor: '#667eea',
        borderColor: '#667eea',
    },
    filterButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
    },
    filterButtonTextActive: {
        color: '#ffffff',
    },
    shiftsContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    shiftsContent: {
        paddingTop: 16,
        paddingBottom: 20,
    },
    shiftsCount: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 16,
        textAlign: 'center',
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
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#7f8c8d',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    shiftCard: {
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
    shiftHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    dateTimeContainer: {
        flex: 1,
    },
    shiftDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
        textTransform: 'capitalize',
    },
    shiftTime: {
        fontSize: 18,
        fontWeight: '600',
        color: '#667eea',
        marginBottom: 4,
    },
    shiftDuration: {
        fontSize: 14,
        color: '#7f8c8d',
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
    detailIcon: {
        fontSize: 16,
        marginRight: 8,
        width: 20,
        textAlign: 'center',
    },
    detailText: {
        fontSize: 14,
        color: '#2c3e50',
        flex: 1,
    },
});

export default MyShiftsScreen;
