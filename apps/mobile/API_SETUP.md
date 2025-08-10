# API Setup for Mobile App

## Problem
Mobil-appen kan ikke logge inn fordi den bruker `localhost:3001` som API-endepunkt. `localhost` refererer til enheten som kjører koden (mobilen), ikke til serveren din.

## Løsning
Vi har opprettet en konfigurasjonsfil som lar deg enkelt bytte mellom localhost og din faktiske IP-adresse.

## Steg for å finne din IP-adresse

### Windows
1. Åpne Command Prompt eller PowerShell
2. Kjør kommandoen: `ipconfig`
3. Se etter "IPv4 Address" under nettverksadapteren du bruker (vanligvis "Ethernet adapter" eller "Wireless LAN adapter")
4. IP-adressen vil se ut som: `192.168.1.100` eller `10.0.0.100`

### Mac/Linux
1. Åpne Terminal
2. Kjør kommandoen: `ifconfig` (Mac) eller `ip addr` (Linux)
3. Se etter "inet" etterfulgt av IP-adressen

## Konfigurering

### 1. Oppdater API-konfigurasjon
Åpne filen `src/config/api.ts` og endre `DEVICE_IP` til din faktiske IP-adresse:

```typescript
// Endre denne linjen til din faktiske IP-adresse
const DEVICE_IP = '192.168.1.100'; // Endre til din IP
```

### 2. Sjekk at serveren kjører
Sørg for at API-serveren kjører på port 3001:
```bash
cd apps/api
npm run start:dev
```

### 3. Test tilkoblingen
På mobilen din, åpne nettleseren og gå til:
```
http://[DIN_IP]:3001
```

Du skal se en velkomstmelding eller API-dokumentasjon.

## Feilsøking

### Kan ikke koble til
- Sjekk at mobilen og datamaskinen er på samme nettverk
- Sjekk at Windows Firewall tillater tilkoblinger på port 3001
- Sjekk at IP-adressen er korrekt

### Windows Firewall
Hvis du får problemer med Windows Firewall:
1. Åpne Windows Defender Firewall
2. Klikk "Allow an app or feature through Windows Defender Firewall"
3. Finn Node.js eller din terminal-app
4. Sjekk både "Private" og "Public"

### Alternative løsninger
Hvis du fortsatt har problemer, kan du:
1. Bruke en emulator på datamaskinen (localhost vil fungere)
2. Bruke ngrok for å lage en tunnel til localhost
3. Deploye API-en til en cloud-tjeneste

## Miljøvariabler (valgfritt)
Du kan også bruke miljøvariabler for å sette API-URL:

```bash
# I .env fil
API_URL=http://192.168.1.100:3001
```

Og oppdater `src/config/api.ts`:
```typescript
const API_BASE_URL = process.env.API_URL || `http://${LOCAL_IP}:3001`;
```
