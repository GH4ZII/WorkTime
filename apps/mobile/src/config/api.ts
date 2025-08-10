// API Configuration for mobile app
// This file automatically detects the environment and uses the correct IP
import { Platform } from 'react-native';

// For Android emulator, use 10.0.2.2 (special IP that maps to host machine)
// For physical device, use your computer's actual IP address
// For iOS simulator, use localhost

const getBaseUrl = () => {
  if (__DEV__) {
    // Development mode
    // Check if running on Android emulator
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3001'; // Android emulator special IP
    }
    // Check if running on iOS simulator
    if (Platform.OS === 'ios') {
      return 'http://localhost:3001'; // iOS simulator
    }
    // Physical device - use your computer's IP
    return 'http://192.168.10.128:3001'; // ENDRE TIL DIN IP!
  }
  
  // Production mode - use your production server
  return 'https://your-production-server.com';
};

const API_BASE_URL = getBaseUrl();

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
    },
    SHIFTS: `${API_BASE_URL}/shifts`,
    USERS: `${API_BASE_URL}/users`,
    WORKLOG: `${API_BASE_URL}/worklog`,
    NOTIFICATIONS: `${API_BASE_URL}/notifications`,
    CHAT: `${API_BASE_URL}/chat`,
    SHIFT_SWAP_REQUESTS: `${API_BASE_URL}/shift-swap-requests`,
    TIME_OFF_REQUESTS: `${API_BASE_URL}/time-off-requests`,
};

export default API_BASE_URL;
