import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import PushNotificationService from '../services/PushNotificationService';

export const PushNotificationTest: React.FC = () => {
  const handleTestNotification = async () => {
    try {
      await PushNotificationService.getInstance().showLocalNotification({
        title: 'Test Notifikasjon',
        body: 'Dette er en test av push-notifikasjoner i WorkTime appen!',
        data: {
          shiftId: 'test-shift-123',
          type: 'test',
        },
      });
    } catch (error) {
      console.error('Failed to show test notification:', error);
    }
  };

  const handleGetToken = () => {
    const token = PushNotificationService.getInstance().getPushToken();
    if (token) {
      console.log('Current push token:', token);
      Alert.alert('Push Token', `Token: ${token.substring(0, 50)}...`);
    } else {
      Alert.alert('Push Token', 'No push token available');
    }
  };

  const handleUpdateToken = async () => {
    try {
      await PushNotificationService.getInstance().updateToken();
      Alert.alert('Success', 'Token updated successfully');
    } catch (error) {
      console.error('Failed to update token:', error);
      Alert.alert('Error', 'Failed to update token');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Push Notification Test</Text>
        <Text style={styles.description}>
          Test push-notifikasjoner og token-håndtering
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={handleTestNotification}>
          <Text style={styles.buttonText}>Test Lokal Notifikasjon</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.outlineButton} onPress={handleGetToken}>
          <Text style={styles.outlineButtonText}>Vis Push Token</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.outlineButton} onPress={handleUpdateToken}>
          <Text style={styles.outlineButtonText}>Oppdater Token</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#667eea',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#667eea',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PushNotificationTest;
