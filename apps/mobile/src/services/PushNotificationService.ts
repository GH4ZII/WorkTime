import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import axios from 'axios';

// Konfigurer hvordan notifikasjoner skal vises når appen er i forgrunnen
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface PushNotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}

export class PushNotificationService {
  private static instance: PushNotificationService;
  private expoPushToken: string | null = null;
  private notificationListener: Notifications.Subscription | null = null;
  private responseListener: Notifications.Subscription | null = null;

  private constructor() {}

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  /**
   * Initialiserer push-notifikasjoner
   */
  public async initialize(): Promise<void> {
    try {
      // Be om tillatelse
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Push notification permission not granted');
        return;
      }

      // Hent Expo push token
      if (Device.isDevice) {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });
        this.expoPushToken = token.data;
        console.log('Expo push token:', this.expoPushToken);

        // Registrer token på backend
        await this.registerToken();
      }

      // Sett opp notification channels for Android
      if (Platform.OS === 'android') {
        await this.setupAndroidChannels();
      }

      // Lytt på notifikasjoner
      this.setupNotificationListeners();
    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  }

  /**
   * Registrerer push token på backend
   */
  private async registerToken(): Promise<void> {
    if (!this.expoPushToken) return;

    try {
      const deviceId = Device.osInternalBuildId || Device.deviceName || 'unknown';
      const platform = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';

      await axios.post('/api/push-tokens', {
        token: this.expoPushToken,
        deviceId,
        platform,
      });
    } catch (error) {
      console.error('Error registering push token:', error);
    }
  }

  /**
   * Setter opp Android notification channels
   */
  private async setupAndroidChannels(): Promise<void> {
    if (Platform.OS !== 'android') return;

    await Notifications.setNotificationChannelAsync('shifts', {
      name: 'Skift-varsler',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#667eea',
      sound: 'default',
      enableVibrate: true,
      showBadge: true,
    });

    await Notifications.setNotificationChannelAsync('general', {
      name: 'Generelle varsler',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250],
      lightColor: '#667eea',
      sound: 'default',
      enableVibrate: true,
      showBadge: false,
    });
  }

  /**
   * Setter opp notification listeners
   */
  private setupNotificationListeners(): void {
    // Lytt på notifikasjoner når de kommer
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Lytt på når bruker klikker på notifikasjon
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      
      // Håndter dyplenking basert på data
      const data = response.notification.request.content.data;
      if (data?.shiftId) {
        // Naviger til shift-screen med shiftId
        this.handleShiftNotification(data.shiftId);
      }
    });
  }

  /**
   * Håndterer shift-notifikasjoner og dyplenking
   */
  private handleShiftNotification(shiftId: string): void {
    // Dette vil bli implementert i navigation context
    // For nå logger vi bare
    console.log('Navigating to shift:', shiftId);
  }

  /**
   * Henter eksisterende push token
   */
  public getPushToken(): string | null {
    return this.expoPushToken;
  }

  /**
   * Oppdaterer push token (f.eks. etter login)
   */
  public async updateToken(): Promise<void> {
    if (Device.isDevice) {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
      this.expoPushToken = token.data;
      await this.registerToken();
    }
  }

  /**
   * Rydder opp listeners
   */
  public cleanup(): void {
    if (this.notificationListener) {
      this.notificationListener.remove();
    }
    if (this.responseListener) {
      this.responseListener.remove();
    }
  }

  /**
   * Viser en lokal notifikasjon (for testing)
   */
  public async showLocalNotification(payload: PushNotificationPayload): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: payload.title,
        body: payload.body,
        data: payload.data || {},
        sound: 'default',
      },
      trigger: null, // Vis umiddelbart
    });
  }
}

export default PushNotificationService;
