import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import ScreenHeader from '../components/ScreenHeader';
import { API_ENDPOINTS } from '../config/api-simple';
import axios from 'axios';

const { width } = Dimensions.get('window');

interface Shift {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  location?: string;
  notes?: string;
  status: string;
  user?: {
    id: string;
    name: string;
  };
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const HomeScreen: React.FC = () => {
  const { user, token } = useAuth(); // Endret fra currentUser til user
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCoworkersList, setShowCoworkersList] = useState(false);

  useEffect(() => {
    // Sjekk om brukeren er logget inn før vi henter data
    if (user && token) {
      fetchShifts();
      fetchEmployees();
    } else {
      setLoading(false);
    }
  }, [user, token]); // Endret dependency

  const fetchShifts = async () => {
    if (!token) return;
    
    try {
      const response = await axios.get(API_ENDPOINTS.SHIFTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    }
  };

  const fetchEmployees = async () => {
    if (!token) return;
    
    try {
      const response = await axios.get(API_ENDPOINTS.USERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  // Hent kun brukerens egne skift
  const getUserShifts = () => {
    if (!user?.id) {
      console.log('No current user ID');
      return [];
    }
    const userShifts = shifts.filter(shift => shift.userId === user.id);
    return userShifts;
  };

  // Hent unike datoer med skift (for kalender-prikker)
  const getDatesWithShifts = () => {
    const userShifts = getUserShifts();
    const uniqueDates = new Set();
    
    userShifts.forEach(shift => {
      const dateStr = new Date(shift.startTime).toISOString().split('T')[0];
      uniqueDates.add(dateStr);
    });
    
    return Array.from(uniqueDates);
  };

  // Hent skift for valgt dato
  const getShiftsForSelectedDate = () => {
    if (!selectedDate) return [];
    const userShifts = getUserShifts();
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    
    return userShifts.filter(shift => {
      const shiftDateStr = new Date(shift.startTime).toISOString().split('T')[0];
      return shiftDateStr === selectedDateStr;
    });
  };

  // Hent medarbeidere for valgt dato
  const getCoworkersForSelectedDate = () => {
    if (!selectedDate) return [];
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    
    return shifts.filter(shift => {
      const shiftDateStr = new Date(shift.startTime).toISOString().split('T')[0];
      return shiftDateStr === selectedDateStr;
    }).map(shift => {
      const employee = employees.find(emp => emp.id === shift.userId);
      return {
        name: employee?.name || 'Ukjent',
        startTime: shift.startTime,
        endTime: shift.endTime,
        location: shift.location
      };
    });
  };

  // Beregn total arbeidstid for måneden
  const getTotalWorkHours = () => {
    const userShifts = getUserShifts();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    
    return userShifts.reduce((total, shift) => {
      const shiftDate = new Date(shift.startTime);
      if (shiftDate.getMonth() === currentMonth && shiftDate.getFullYear() === currentYear) {
        const start = new Date(shift.startTime);
        const end = new Date(shift.endTime);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return total + hours;
      }
      return total;
    }, 0);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const getCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Start på mandag forrige uke hvis måneden ikke starter på mandag
    const startDate = new Date(firstDay);
    const firstDayOfWeek = firstDay.getDay();
    
    // Beregn hvor mange dager tilbake vi må gå for å starte på mandag
    // getDay() returnerer: 0=Søndag, 1=Mandag, 2=Tirsdag, 3=Onsdag, 4=Torsdag, 5=Fredag, 6=Lørdag
    // Vi vil starte på mandag, så vi må gå tilbake til mandag forrige uke
    let daysToSubtract;
    if (firstDayOfWeek === 0) { // Søndag
      daysToSubtract = 6; // Gå 6 dager tilbake til mandag forrige uke
    } else if (firstDayOfWeek === 1) { // Mandag
      daysToSubtract = 0; // Start på mandag samme uke
    } else {
      daysToSubtract = firstDayOfWeek - 1; // Gå tilbake til mandag samme uke
    }
    
    startDate.setDate(firstDay.getDate() - daysToSubtract);
    
    const days = [];
    const currentDate = new Date(startDate);
    
    // Fyll opp med 42 dager (6 uker) for å sikre at vi har nok dager
    while (days.length < 42) {
      days.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' });
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
  };

  const getDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours;
  };

  const getUserName = (userId: string) => {
    const employee = employees.find(emp => emp.id === userId);
    return employee?.name || 'Ukjent';
  };

  const datesWithShifts = getDatesWithShifts();
  const shiftsForSelectedDate = getShiftsForSelectedDate();
  const coworkersForSelectedDate = getCoworkersForSelectedDate();
  const totalWorkHours = getTotalWorkHours();

  // Hvis brukeren ikke er logget inn, vis en melding
  if (!user || !token) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Hjem" subtitle="Oversikt over dine vakter og arbeidstid" />
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Du må være logget inn for å se dine vakter</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Hjem" subtitle="Oversikt over dine vakter og arbeidstid" />
        <View style={styles.loadingContainer}>
          <Text>Laster...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Hjem" subtitle="Oversikt over dine vakter og arbeidstid" />
      
      <ScrollView style={styles.content}>
        {/* Samlet seksjon med arbeidssummer og kalender */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarContent}>
            {/* Månedlig arbeidssummer øverst */}
            <View style={styles.summarySection}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Arbeid</Text>
                <Text style={styles.summaryHours}>{totalWorkHours.toFixed(1)} timer</Text>
              </View>
            </View>

            {/* Kalender */}
            <View style={styles.calendarSection}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={goToPreviousMonth}>
                  <Ionicons name="chevron-back" size={24} color="#1976d2" />
                </TouchableOpacity>
                <Text style={styles.monthYear}>{formatMonthYear(selectedDate)}</Text>
                <TouchableOpacity onPress={goToNextMonth}>
                  <Ionicons name="chevron-forward" size={24} color="#1976d2" />
                </TouchableOpacity>
              </View>
              
              {/* Ukedager */}
              <View style={styles.weekDays}>
                {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map(day => (
                  <Text key={day} style={styles.weekDay}>{day}</Text>
                ))}
              </View>
              
              {/* Kalender-dager */}
              <View style={styles.calendarGrid}>
                {getCalendarDays().map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDay,
                      day.isCurrentMonth && styles.currentMonthDay,
                      day.date && selectedDate && 
                      day.date.toDateString() === selectedDate.toDateString() && 
                      styles.selectedDay
                    ]}
                    onPress={() => day.date && setSelectedDate(day.date)}
                    disabled={!day.date}
                  >
                    {day.date && (
                      <View style={styles.dayContainer}>
                        <Text style={[
                          styles.dayNumber,
                          day.isCurrentMonth && styles.currentMonthDayNumber,
                          day.date && selectedDate && 
                          day.date.toDateString() === selectedDate.toDateString() && 
                          styles.selectedDayNumber
                        ]}>
                          {day.date.getDate()}
                        </Text>
                        {/* Vis kun 1 prikk per dag hvis brukeren har skift */}
                        {day.date && datesWithShifts.includes(day.date.toISOString().split('T')[0]) && (
                          <View style={styles.shiftDot}>
                            <Text style={{ color: 'white', fontSize: 8 }}>•</Text>
                          </View>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Informasjon under kalenderen - samlet i samme kort */}
            {selectedDate && (shiftsForSelectedDate.length > 0 || coworkersForSelectedDate.length > 0) && (
              <View style={styles.infoSection}>
                {/* Vis enten arbeidstid ELLER medarbeider-liste, ikke begge samtidig */}
                {!showCoworkersList ? (
                  // Vis arbeidstid når medarbeider-listen ikke er synlig
                  shiftsForSelectedDate.length > 0 && (
                    <View style={styles.shiftTimeContainer}>
                      <Text style={styles.shiftTimeText}>
                        {formatTime(shiftsForSelectedDate[0].startTime)} - {formatTime(shiftsForSelectedDate[0].endTime)}
                      </Text>
                      <Text style={styles.shiftTimeSubtext}>
                        🕐 Du jobber i dag
                      </Text>
                    </View>
                  )
                ) : (
                  // Vis medarbeider-liste når knappen er trykket
                  coworkersForSelectedDate.length > 0 && (
                    <View style={styles.coworkersList}>
                      <Text style={styles.coworkersListTitle}>Medarbeidere denne dagen:</Text>
                      {coworkersForSelectedDate
                        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                        .map((coworker, index) => (
                          <View key={index} style={styles.coworkerItem}>
                            <Text style={styles.coworkerName}>👤 {coworker.name}</Text>
                            <Text style={styles.coworkerTime}>
                              🕐 {formatTime(coworker.startTime)} - {formatTime(coworker.endTime)}
                            </Text>
                            {coworker.location && (
                              <Text style={styles.coworkerLocation}>
                                🗺️ {coworker.location}
                              </Text>
                            )}
                          </View>
                        ))}
                    </View>
                  )
                )}

                {/* Knapp for å vise/skjule medarbeidere */}
                {coworkersForSelectedDate.length > 0 && (
                  <View style={styles.coworkersButtonContainer}>
                    <TouchableOpacity 
                      style={styles.coworkersButton}
                      onPress={() => setShowCoworkersList(!showCoworkersList)}
                    >
                      <Text style={styles.coworkersButtonText}>
                        {showCoworkersList ? 'Tilbake til arbeidstid' : 'Se medarbeidere'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendarContent: {
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: (width - 64) / 7,
    height: 55,  // Litt høyere for bedre touch-target
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,  // Litt mer mellomrom
    borderRadius: 8,  // Runde hjørner på hver dag
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  currentMonthDay: {
    // Styling for gjeldende måned
  },
  currentMonthDayNumber: {
    color: '#333',
    fontWeight: '500',
  },
  selectedDay: {
    backgroundColor: '#667eea',
    borderRadius: 25,  // Mer rundt for valgt dag
    elevation: 3,  // Litt skygge for valgt dag
  },
  selectedDayNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  dayNumber: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 2, // Gi plass til prikk
  },
  shiftDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
    marginTop: 2,
  },
  summaryCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,  // Litt mindre for bedre balanse
    fontWeight: '600',
    color: '#666',  // Litt lysere for mindre oppmerksomhet
    marginBottom: 8,
  },
  summaryHours: {
    fontSize: 24,  // Større for å fremheve det viktige
    fontWeight: 'bold',
    color: '#667eea',
  },
  shiftsCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shiftsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  shiftsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  shiftItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  shiftInfo: {
    flex: 1,
  },
  shiftTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  shiftDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  shiftEmployee: {
    fontSize: 14,
    color: '#666',
  },
  shiftStatus: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  coworkersCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coworkersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  coworkerItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  coworkerInfo: {
    flex: 1,
  },
  coworkerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  coworkerTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  coworkerLocation: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarSection: {
    // No specific styles needed here, content will be inside
  },
  coworkersButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  coworkersButton: {
    backgroundColor: '#667eea',
    paddingVertical: 18,  // Litt høyere
    paddingHorizontal: 36,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,  // Litt mer skygge
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minHeight: 60,
    minWidth: 220,
  },
  coworkersButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  coworkersList: {
    marginTop: 16,
    // Fjernet paddingTop og borderTopWidth for å unngå doble streker
  },
  coworkersListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 16,
    textAlign: 'center',
  },
  coworkerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coworkerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 6,
    textAlign: 'center',
  },
  coworkerTime: {
    fontSize: 16,
    color: '#667eea',
    marginBottom: 4,
    textAlign: 'center',
  },
  coworkerLocation: {
    fontSize: 16,
    color: '#667eea',
    textAlign: 'center',
  },
  shiftTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 20,  // Litt mer padding
    paddingHorizontal: 24,
    backgroundColor: '#f0f4ff',  // Litt blåere bakgrunn
    borderRadius: 16,  // Mer rundt
    marginHorizontal: 16,
    minHeight: 70,
    borderWidth: 1,
    borderColor: '#e8f0ff',  // Subtil kant
  },
  shiftTimeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 8,
  },
  shiftTimeSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  coworkersButtonCard: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coworkersListCard: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoSection: {
    marginTop: 24,  // Litt mer mellomrom
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',  // Litt lysere linje
  },
  coworkersListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;
