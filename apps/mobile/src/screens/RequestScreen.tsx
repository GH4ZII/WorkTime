import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_ENDPOINTS } from '../config/api-simple';
import axios from 'axios';
import ScreenHeader from '../components/ScreenHeader';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  location?: string;
  user: {
    id: string;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
}

const RequestScreen: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'swap' | 'timeoff'>('swap');
  const [isLoading, setIsLoading] = useState(false);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Shift swap state
  const [swapType, setSwapType] = useState<'GIVE_AWAY' | 'SWAP'>('GIVE_AWAY');
  const [selectedShift, setSelectedShift] = useState<string>('');
  const [selectedSwapUser, setSelectedSwapUser] = useState<string>('');
  const [selectedSwapShift, setSelectedSwapShift] = useState<string>('');
  const [swapReason, setSwapReason] = useState('');

  // Time off state
  const [timeOffType, setTimeOffType] = useState<'VACATION' | 'SICK' | 'OTHER'>('VACATION');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [timeOffReason, setTimeOffReason] = useState('');
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoadingData(true);
      const [shiftsResponse, usersResponse] = await Promise.all([
        axios.get(API_ENDPOINTS.SHIFTS),
        axios.get(API_ENDPOINTS.USERS)
      ]);
      
      setShifts(shiftsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Feil', 'Kunne ikke hente data fra server');
    } finally {
      setIsLoadingData(false);
    }
  };

  // Hent kun brukerens egne vakter
  const getUserShifts = () => {
    if (!currentUser) return [];
    return shifts.filter(shift => shift.user.id === currentUser.id);
  };

  // Hent vakter for en spesifikk bruker (for bytte)
  const getUserShiftsForSwap = (userId: string) => {
    return shifts.filter(shift => shift.user.id === userId);
  };

  // Hent alle andre brukere (ikke den nåværende)
  const getOtherUsers = () => {
    if (!currentUser) return [];
    return users.filter(user => user.id !== currentUser.id);
  };

  const handleSwapRequest = async () => {
    if (!currentUser) {
      Alert.alert('Feil', 'Du må være innlogget for å sende forespørsler');
      return;
    }

    if (!selectedShift) {
      Alert.alert('Feil', 'Vennligst velg et skift å bytte bort');
      return;
    }

    if (swapType === 'GIVE_AWAY') {
      if (!selectedSwapUser) {
        Alert.alert('Feil', 'Vennligst velg hvem du vil gi vakten til');
        return;
      }
    } else if (swapType === 'SWAP') {
      if (!selectedSwapUser) {
        Alert.alert('Feil', 'Vennligst velg hvem du vil bytte med');
        return;
      }
      if (!selectedSwapShift) {
        Alert.alert('Feil', 'Vennligst velg hvilket skift du vil bytte til');
        return;
      }
    }

    setIsLoading(true);
    try {
      const swapData = {
        userId: currentUser.id,
        fromShiftId: selectedShift,
        type: swapType,
        swapWithId: selectedSwapUser, // Bruk selectedSwapUser for både GIVE_AWAY og SWAP
        toShiftId: swapType === 'SWAP' ? selectedSwapShift : undefined,
        reason: swapReason || undefined,
      };

      await axios.post(API_ENDPOINTS.SHIFT_SWAP_REQUESTS, swapData);
      
      Alert.alert(
        'Suksess!',
        'Din forespørsel om skiftbytte er sendt inn og venter på godkjenning.',
        [{ text: 'OK', onPress: () => resetSwapForm() }]
      );
    } catch (error) {
      Alert.alert('Feil', 'Kunne ikke sende inn forespørsel. Prøv igjen.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeOffRequest = async () => {
    if (!currentUser) {
      Alert.alert('Feil', 'Du må være innlogget for å sende forespørsler');
      return;
    }

    if (fromDate >= toDate) {
      Alert.alert('Feil', 'Sluttdato må være etter startdato');
      return;
    }

    setIsLoading(true);
    try {
      const timeOffData = {
        userId: currentUser.id,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        type: timeOffType,
        reason: timeOffReason || undefined,
      };

      await axios.post(API_ENDPOINTS.TIME_OFF_REQUESTS, timeOffData);
      
      Alert.alert(
        'Suksess!',
        'Din forespørsel om fridager er sendt inn og venter på godkjenning.',
        [{ text: 'OK', onPress: () => resetTimeOffForm() }]
      );
    } catch (error) {
      Alert.alert('Feil', 'Kunne ikke sende inn forespørsel. Prøv igjen.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSwapForm = () => {
    setSelectedShift('');
    setSelectedSwapUser('');
    setSelectedSwapShift('');
    setSwapReason('');
  };

  const resetTimeOffForm = () => {
    setFromDate(new Date());
    setToDate(new Date());
    setTimeOffReason('');
  };

  const formatShiftDisplay = (shift: Shift) => {
    const date = new Date(shift.startTime);
    const startTime = new Date(shift.startTime);
    const endTime = new Date(shift.endTime);
    
    return `${date.toLocaleDateString('nb-NO')} ${startTime.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })}-${endTime.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const renderSwapRequest = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Skiftbytte / Gi bort vakt</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type forespørsel</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={swapType}
            onValueChange={(value) => {
              setSwapType(value);
              // Reset swap-specific fields when changing type
              if (value === 'GIVE_AWAY') {
                setSelectedSwapUser('');
                setSelectedSwapShift('');
              }
            }}
            style={styles.picker}
          >
            <Picker.Item label="Gi bort vakt" value="GIVE_AWAY" />
            <Picker.Item label="Bytte vakt" value="SWAP" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Velg ditt skift å bytte bort</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedShift}
            onValueChange={setSelectedShift}
            style={styles.picker}
          >
            <Picker.Item label="Velg ditt skift..." value="" />
            {getUserShifts().map((shift) => (
              <Picker.Item
                key={shift.id}
                label={formatShiftDisplay(shift)}
                value={shift.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Legg til valg av hvem vakten skal gis bort til for GIVE_AWAY */}
      {swapType === 'GIVE_AWAY' && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gi vakt til medarbeider</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSwapUser}
              onValueChange={setSelectedSwapUser}
              style={styles.picker}
            >
              <Picker.Item label="Velg medarbeider..." value="" />
              {getOtherUsers().map((user) => (
                <Picker.Item
                  key={user.id}
                  label={user.name}
                  value={user.id}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}

      {swapType === 'SWAP' && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bytte med medarbeider</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSwapUser}
                onValueChange={(value) => {
                  setSelectedSwapUser(value);
                  setSelectedSwapShift(''); // Reset shift selection when user changes
                }}
                style={styles.picker}
              >
                <Picker.Item label="Velg medarbeider..." value="" />
                {getOtherUsers().map((user) => (
                  <Picker.Item
                    key={user.id}
                    label={user.name}
                    value={user.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Velg skift å bytte til</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSwapShift}
                onValueChange={setSelectedSwapShift}
                style={styles.picker}
                enabled={!!selectedSwapUser}
              >
                <Picker.Item label="Velg skift..." value="" />
                {selectedSwapUser ? getUserShiftsForSwap(selectedSwapUser).map((shift) => (
                  <Picker.Item
                    key={shift.id}
                    label={formatShiftDisplay(shift)}
                    value={shift.id}
                  />
                )) : null}
              </Picker>
            </View>
            {selectedSwapUser && getUserShiftsForSwap(selectedSwapUser).length === 0 && (
              <Text style={styles.warningText}>
                Denne medarbeideren har ingen vakter å bytte med
              </Text>
            )}
          </View>
        </>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Årsak (valgfritt)</Text>
        <TextInput
          style={styles.textInput}
          value={swapReason}
          onChangeText={setSwapReason}
          placeholder="Hvorfor ønsker du å bytte?"
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSwapRequest}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Send inn forespørsel</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderTimeOffRequest = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Forespørsel om fridager</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type fridag</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={timeOffType}
            onValueChange={setTimeOffType}
            style={styles.picker}
          >
            <Picker.Item label="Ferie" value="VACATION" />
            <Picker.Item label="Syk" value="SICK" />
            <Picker.Item label="Annet" value="OTHER" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fra dato</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowFromDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {fromDate.toLocaleDateString('nb-NO')}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#667eea" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Til dato</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowToDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {toDate.toLocaleDateString('nb-NO')}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#667eea" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Årsak (valgfritt)</Text>
        <TextInput
          style={styles.textInput}
          value={timeOffReason}
          onChangeText={setTimeOffReason}
          placeholder="Hvorfor trenger du fridager?"
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleTimeOffRequest}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Send inn forespørsel</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  if (isLoadingData) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Forespørsel" subtitle="Laster..." />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.loadingText}>Laster data...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Forespørsel" subtitle="Send inn forespørsler" />
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'swap' && styles.activeTab]}
          onPress={() => setActiveTab('swap')}
        >
          <Ionicons 
            name="swap-horizontal-outline" 
            size={20} 
            color={activeTab === 'swap' ? '#667eea' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'swap' && styles.activeTabText]}>
            Skiftbytte
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'timeoff' && styles.activeTab]}
          onPress={() => setActiveTab('timeoff')}
        >
          <Ionicons 
            name="calendar-outline" 
            size={20} 
            color={activeTab === 'timeoff' ? '#667eea' : '#666'} 
          />
          <Text style={[styles.tabText, activeTab === 'timeoff' && styles.activeTabText]}>
            Fridager
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'swap' ? renderSwapRequest() : renderTimeOffRequest()}
      </ScrollView>

      {/* Date Pickers */}
      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowFromDatePicker(false);
            if (selectedDate) setFromDate(selectedDate);
          }}
        />
      )}

      {showToDatePicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowToDatePicker(false);
            if (selectedDate) setToDate(selectedDate);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#f0f2ff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#667eea',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    fontStyle: 'italic',
  },
  warningText: {
    fontSize: 12,
    color: '#e74c3c',
    marginTop: 4,
    fontStyle: 'italic',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  picker: {
    height: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  submitButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RequestScreen;
