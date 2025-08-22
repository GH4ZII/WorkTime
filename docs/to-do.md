# 🚀 WorkTime - Utviklingsplan & Funksjonalitet

Denne filen kombinerer utviklingsplanen og funksjonalitetsoversikten for WorkTime-applikasjonen. Den beskriver både **hvilke funksjoner** som skal implementeres og **hvordan** de skal utvikles.

## 📱 M3 – Mobilapp for Ansatte

### 3.1 Ansattfunksjonalitet
- [ ] Den ansatte skal kunne se ledige vakter og søke på de
- [ ] Søke på ledige vakter
- [ ] Sende forespørsler for skiftbytter og fravær

### 3.2 Medarbeideroversikt
- [ ] Se liste over kollegaer
- [ ] Søk etter ansatte
- [ ] Vis profil (navn, e-post, telefon)
- [ ] Mulighet for å sende direktemelding

### 3.3 Notifikasjoner
- [ ] Push-varsler for godkjenning/avvisning av forespørsler
- [ ] Varsler for kommende skift
- [ ] Påminnelser om kommende skift

### 3.4 Innstillinger
- [ ] Endre passord
- [ ] Logg ut

### 3.5 Sanntidsoppdateringer
- [ ] Oppdater UI live ved skift- og forespørselsendringer
- [ ] Når admin legger til, endrer eller sletter skift, oppdateres appen automatisk
- [ ] Chat-meldinger oppdateres i sanntid
- [ ] Push-varsler med Expo

## 🖥️ M4 – Adminportal (Web)

### 4.1 Adminfunksjonalitet
- [ ] Admin skal kunne sette fravær på ansatte
- [ ] Admin skal kunne legge ut en vakt for ansatte å søke på
- [ ] Godkjenne/avvise forespørsler

### 4.2 Brukeradministrasjon
- [ ] Liste & søk ansatte
- [ ] Administrere brukerrettigheter

### 4.3 Rapporter & Statistikk
- [ ] Timer per ansatt/avdeling/periode
- [ ] Eksport til CSV

### 4.4 Sanntids-push
- [ ] Alle brukere ser umiddelbare endringer i skift, forespørsler og meldinger
- [ ] Live chat-interface for direktemeldinger

### 4.5 Automasjon
- [ ] Når Admin legger inn fravær på noen så blir det automatisk sendt ut ledig vakt
- [ ] Implementer en knapp der admin kan velge å sende ut eller ikke

## ⚡ M5 – Sanntid & Chat

### 5.1 Sanntid (WebSocket)
- [ ] WebSocket-implementering for live oppdateringer
- [ ] Sanntidsoppdateringer for skift, forespørsler og meldinger

### 5.2 Chat-system
- [ ] Direktemeldinger mellom ansatte
- [ ] Live chat-interface
- [ ] Chat-historikk

## 🧪 M6 – Deployment

### 6.1 CI/CD & Testing
- [ ] CI/CD med GitHub Actions (test + deploy)
- [ ] Docker Compose for lokal testing

### 6.2 Deployment
- [ ] Backend: Azure App Service
- [ ] Mobilapp: Deploy til App Store og Play Store

---

## 📋 Implementeringsstatus

Bruk denne filen som sjekkliste når du utvikler. Kryss av for hver funksjon som er implementert og testet.

### Prioriterte funksjoner for neste sprint:
1. Grunnleggende autentisering
2. Skiftadministrasjon (CRUD)
3. Forespørsler for skiftbytter og fravær
4. Push-varsler
5. Sanntidsoppdateringer via WebSocket
