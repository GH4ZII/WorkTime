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
    console.log('Filtered shifts for user:', userShifts);
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
    
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || days.length < 42) {
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
  console.log('Dates with shifts:', datesWithShifts);
  console.log('Current user ID:', user?.id);
  console.log('User shifts:', getUserShifts());
  const shiftsForSelectedDate = getShiftsForSelectedDate();
  const coworkersForSelectedDate = getCoworkersForSelectedDate();
  const totalWorkHours = getTotalWorkHours();

  // Legg til debugging
  console.log('=== DEBUG INFO ===');
  console.log('Current user:', user);
  console.log('Current user ID:', user?.id);
  console.log('Current user token:', token ? 'Exists' : 'Missing');
  console.log('All shifts:', shifts);
  console.log('User shifts:', getUserShifts());
  console.log('Dates with shifts:', getDatesWithShifts());
  console.log('==================');

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
        {/* Kalender */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarContent}>
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
              {['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'].map(day => (
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
        </View>

        {/* Månedlig arbeidssummer */}
        <View style={styles.summaryCard}>
          <View style={styles.cardContent}>
            <Text style={styles.summaryTitle}>Arbeid denne måneden</Text>
            <Text style={styles.summaryHours}>{totalWorkHours.toFixed(1)} timer</Text>
          </View>
        </View>

        {/* Vakter for valgt dato */}
        {selectedDate && (
          <View style={styles.shiftsCard}>
            <View style={styles.cardContent}>
              <Text style={styles.shiftsTitle}>
                Vakter {formatDate(selectedDate)}
              </Text>
              <Text style={styles.shiftsCount}>
                {shiftsForSelectedDate.length} vakt{shiftsForSelectedDate.length !== 1 ? 'er' : ''}
              </Text>
              
              {shiftsForSelectedDate.map((shift, index) => (
                <View key={shift.id} style={styles.shiftItem}>
                  <View style={styles.shiftInfo}>
                    <Text style={styles.shiftTime}>
                      {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                    </Text>
                    <Text style={styles.shiftDuration}>
                      {getDuration(shift.startTime, shift.endTime)} timer
                    </Text>
                    <Text style={styles.shiftEmployee}>
                      Ansatt: {getUserName(shift.userId)}
                    </Text>
                  </View>
                  <View style={styles.shiftStatus}>
                    <Text style={styles.statusText}>VENTER</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Medarbeidere for valgt dato */}
        {selectedDate && coworkersForSelectedDate.length > 0 && (
          <View style={styles.coworkersCard}>
            <View style={styles.cardContent}>
              <Text style={styles.coworkersTitle}>
                Medarbeidere {formatDate(selectedDate)}
              </Text>
              
              {coworkersForSelectedDate.map((coworker, index) => (
                <View key={index} style={styles.coworkerItem}>
                  <View style={styles.coworkerInfo}>
                    <Text style={styles.coworkerName}>{coworker.name}</Text>
                    <Text style={styles.coworkerTime}>
                      {formatTime(coworker.startTime)} - {formatTime(coworker.endTime)}
                    </Text>
                    {coworker.location && (
                      <Text style={styles.coworkerLocation}>
                        {coworker.location}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
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
    color: '#1976d2',
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
    height: 50, // Økt høyde for å gi plass til prikk
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
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
    backgroundColor: '#1976d2',
    borderRadius: 20,
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
    backgroundColor: '#ff9800',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  summaryHours: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
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
});

export default HomeScreen;
