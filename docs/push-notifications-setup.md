# Push Notifications Setup for WorkTime

Denne dokumentasjonen forklarer hvordan push-notifikasjoner er implementert i WorkTime-appen.

## ⚠️ Viktig: Expo Go Begrensning

**Remote push-notifikasjoner fungerer IKKE i Expo Go med SDK 53+**. Dette er en sikkerhetsbegrensning som Expo har innført.

### Hva som fungerer i Expo Go:
- ✅ Lokale notifikasjoner
- ✅ Permission handling  
- ✅ Android notification channels
- ✅ Token generering
- ❌ Remote push-notifikasjoner fra backend

### Løsning: Development Build
For å teste push-notifikasjoner fullt ut, bruk en development build:

```bash
cd apps/mobile
npx expo install expo-dev-client
eas build --profile development --platform android
# eller
eas build --profile development --platform ios
```

## Oversikt

WorkTime bruker Expo push-notifikasjoner for å sende varsler til brukere om:
- Nye skift som er tildelt
- Oppdateringer av eksisterende skift
- Avlysning av skift
- Andre viktige hendelser

## Arkitektur

### Backend (NestJS)
- **PushTokensModule**: Håndterer registrering og lagring av device tokens
- **PushNotificationsService**: Sender push-notifikasjoner via Expo Server SDK
- **ShiftsService**: Integrert med push-notifikasjoner for automatisk varsling

### Mobil (React Native)
- **PushNotificationService**: Singleton service for å håndtere push-notifikasjoner
- **Automatisk initialisering**: I App.tsx
- **Android notification channels**: For bedre brukeropplevelse

## Installasjon og Oppsett

### 1. Backend Dependencies
```bash
cd apps/api
npm install expo-server-sdk
```

### 2. Mobil Dependencies
```bash
cd apps/mobile
npm install expo-notifications expo-device expo-constants
```

### 3. Database Migration
```bash
cd apps/api
npx prisma migrate dev --name add-push-tokens
npx prisma generate
```

## Konfigurasjon

### app.json (Mobil)
```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#667eea",
          "sounds": ["./assets/notification-sound.wav"]
        }
      ]
    ],
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#667eea",
      "iosDisplayInForeground": true,
      "androidMode": "default",
      "androidCollapsedTitle": "WorkTime"
    }
  }
}
```

### Environment Variables
Legg til følgende i `.env` filen:
```env
# For EAS Build (iOS)
EXPO_PROJECT_ID=your-expo-project-id
```

## Bruk

### Sende Push Notifikasjoner

#### Fra Backend
```typescript
// I en service
constructor(private pushNotificationsService: PushNotificationsService) {}

// Send til en bruker
await this.pushNotificationsService.sendToUser(userId, {
  title: 'Nytt skift',
  body: 'Du har fått tildelt et nytt skift',
  data: { shiftId: '123' }
});

// Send til flere brukere
await this.pushNotificationsService.sendToUsers([userId1, userId2], {
  title: 'Viktig melding',
  body: 'Dette gjelder alle'
});
```

#### Automatisk Varsling
Push-notifikasjoner sendes automatisk når:
- Nye skift opprettes og tildeles til brukere
- Eksisterende skift oppdateres
- Skift avlyses eller gjøres tilgjengelige

### Fra Mobil
```typescript
import PushNotificationService from './src/services/PushNotificationService';

// Test lokal notifikasjon
await PushNotificationService.getInstance().showLocalNotification({
  title: 'Test',
  body: 'Dette er en test',
  data: { shiftId: '123' }
});

// Hent push token
const token = PushNotificationService.getInstance().getPushToken();
```

## Testing

### 1. Test Komponent
Bruk `PushNotificationTest` komponenten for å teste:
- Lokale notifikasjoner
- Push token status
- Token oppdatering

### 2. Backend Testing
```bash
cd apps/api
npm run start:dev
```

Test push-token registrering:
```bash
curl -X POST http://localhost:3000/api/push-tokens \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
    "platform": "ANDROID"
  }'
```
## iOS Spesifikke Instruksjoner

### 1. EAS Build
```bash
cd apps/mobile
eas build --platform ios
```

### 2. Apple Push Notification Service (APNs)
- Opprett APNs nøkkel i Apple Developer Console
- Konfigurer i EAS Dashboard
- Oppdater app.json med riktig bundle identifier

### 3. Provisioning Profile
Sørg for at provisioning profile inkluderer push-notifikasjoner.

## Android Spesifikke Instruksjoner

### 1. Notification Channels
Android notification channels er automatisk konfigurert:
- **shifts**: Høy prioritet for skift-relaterte varsler
- **general**: Standard prioritet for generelle varsler

### 2. Google Services
Legg til `google-services.json` for Firebase Cloud Messaging (valgfritt).

## Feilsøking

### Vanlige Problemer

#### 1. "No push token available"
- Sjekk at appen har tillatelse til notifikasjoner
- Verifiser at `expo-notifications` er riktig installert
- Sjekk at `projectId` er satt i `expo-constants`

#### 2. "Failed to send push notification"
- Verifiser at `expo-server-sdk` er installert
- Sjekk at push tokens er registrert i databasen
- Verifiser at Expo project ID er korrekt

#### 3. Notifikasjoner vises ikke på Android
- Sjekk notification channels
- Verifiser at appen ikke er i "Do Not Disturb" modus
- Test med lokal notifikasjon først

### Debug Tips
```typescript
// Aktiver logging
console.log('Push token:', PushNotificationService.getInstance().getPushToken());

// Test lokal notifikasjon
await PushNotificationService.getInstance().showLocalNotification({
  title: 'Debug',
  body: 'Testing notifications'
});
```

## Sikkerhet

### Token Validering
- Push tokens valideres mot bruker-ID
- Ugyldige tokens deaktiveres automatisk
- Tokens renses hver 30. dag

### Autentisering
- Alle push-token endepunkter krever JWT autentisering
- Tokens kan kun endres av eieren

## Ytelse

### Batch Sending
- Notifikasjoner sendes i chunks for bedre ytelse
- Retry-logikk for feilede leveranser
- Automatisk cleanup av ugyldige tokens

### Monitoring
- Logging av alle push-notifikasjoner
- Feilhåndtering med detaljerte meldinger
- Metrics for leveringssuksess

## Fremtidige Forbedringer

### Planlagte Features
- [ ] Web push-notifikasjoner
- [ ] Push-notifikasjon templates
- [ ] Brukerpreferanser for notifikasjoner
- [ ] Analytics og A/B testing
- [ ] Scheduled notifications

### Integrasjoner
- [ ] Slack/Discord webhooks
- [ ] Email fallback
- [ ] SMS for kritiske meldinger

## Support

Ved problemer eller spørsmål:
1. Sjekk denne dokumentasjonen
2. Se på console logs
3. Test med lokal notifikasjon
4. Kontakt utviklingsteamet

