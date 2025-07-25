# 🚀 Utviklingsplan – WorkTime

## 📌 Hovedmilepæler

1. ✅ M1 – Database & API (FERDIG)
2. ✅ M2 – Design & Prototyping (FERDIG)
3. 🚧 M3 – Mobilapp for Ansatte
4. ⏳ M4 – Webportal for Admin
5. ⏳ M5 – Sanntid & Chat
6. ⏳ M6 – Testing, Dokumentasjon og Deployment

---

## 📱 M3 – Mobilapp for Ansatte

### 3.1 Autentisering & Profil

- [x] Login med e-post og passord
- [x] JWT lagring med SecureStore / AsyncStorage
- [x] Visning av brukerprofil (navn, e-post, rolle)
- [x] Endre passord / Logg ut

### 3.2 Mine Skift

- [x] Liste over kommende og tidligere skift
- [x] Skiftdetaljer: dato, tid, varighet, sted, status
- [x] Notater på skift
- [x] Se kollegaer på samme skift

### 3.3 Forespørsler

- [ ] Fraværsforespørsel: datointervall, type, beskrivelse
- [ ] Bytteforespørsel: velg eget skift → velg kollega/skift
- [ ] Se historikk og status for begge forespørselstyper

### 3.4 Arbeidstimer

- [ ] Beregn og vis timer jobbet (uke/måned)
- [ ] Mulighet for manuell logging (valgfritt)

### 3.5 Notifikasjoner

- [ ] Push-varsler for godkjenning/avvisning
- [ ] Varsler for kommende skift

### 3.6 Chat & Kollegaliste

- [ ] Liste over kollegaer (søkbar)
- [ ] Se kollegaprofil (navn, e-post, telefon)
- [ ] Direktemelding og gruppechat
- [ ] Chat i sanntid

---

## 🖥️ M4 – Adminportal (Web)

### 4.1 Admin Dashboard

- [ ] Nøkkeltall (ansatte, skift i dag, forespørsler)
- [ ] Oversikt over kommende skift

### 4.2 Brukeradministrasjon

- [ ] CRUD for ansatte
- [ ] Søk og filtrer ansatte

### 4.3 Skiftadministrasjon

- [ ] Opprett, rediger, slett skift
- [ ] Koble skift til ansatte
- [ ] Skiftkalender (visuelt)

### 4.4 Håndtering av forespørsler

- [ ] Liste og godkjenning/avvisning av fraværsforespørsler
- [ ] Liste og godkjenning/avvisning av bytteforespørsler

### 4.5 Rapporter & Statistikk

- [ ] Timer per ansatt/avdeling/periode
- [ ] Eksport til CSV

---

## ⚡ M5 – Sanntid & Chat

### 5.1 Sanntid (WebSocket)

- [ ] Socket.io i NestJS backend
- [ ] Emit & lytte til events (skift, forespørsler)

### 5.2 Mobilapp

- [ ] Oppdater UI live ved skift- og forespørselsendringer
- [ ] Push-varsler med Expo

### 5.3 Chat

- [ ] Opprett og bli med i chat-rom
- [ ] Send og motta meldinger live
- [ ] Direktemeldinger & grupper

---

## 🧪 M6 – Testing, Dokumentasjon & Deployment

### 6.1 Testing

- [ ] Enhetstester for services
- [ ] E2E-tester for API med Supertest
- [ ] Manuelle tester på mobil og web

### 6.2 Dokumentasjon

- [ ] Swagger `/docs` med `@nestjs/swagger`
- [ ] Arkitektur.md: ER-diagram + flyt
- [ ] Functionality.md: dekker sanntid & chat

### 6.3 Deployment

- [ ] CI/CD med GitHub Actions (test + deploy)
- [ ] Docker Compose for lokal testing
- [ ] Backend: Azure App Service
- [ ] Mobilapp: Deploy til App Store og Play Store
