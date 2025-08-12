# 🚀 Utviklingsplan – WorkTime

## 📌 Hovedmilepæler

1. ✅ M1 – Database & API (FERDIG)
2. ✅ M2 – Design & Prototyping (FERDIG)
3. ✅ M3 – Mobilapp for Ansatte (FERDIG)
4. ✅ M4 – Webportal for Admin (FERDIG)
5. ✅ M5 – Sanntid & Chat (FERDIG)
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

### 3.3 Forespørsler ( Gjør det senere når Admin Dashboard er oppe )

- [x] Fraværsforespørsel: datointervall, type, beskrivelse
- [x] Bytteforespørsel: velg eget skift → velg kollega/skift
- [z] Se historikk og status for begge forespørselstyper

### 3.4 Arbeidstimer

- [x] Beregn og vis timer jobbet (uke/måned)

### 3.5 Notifikasjoner

- [ ] Push-varsler for godkjenning/avvisning
- [ ] Varsler for kommende skift

### 3.6 Chat & Kollegaliste

- [x] Liste over kollegaer (søkbar)
- [x] Se kollegaprofil (navn, e-post, telefon)
- [x] Direktemelding og gruppechat
- [x] Chat i sanntid

---

## 🖥️ M4 – Adminportal (Web)

### 4.1 Admin Dashboard

- [x] Nøkkeltall (ansatte, skift i dag, forespørsler)
- [x] Oversikt over kommende skift

### 4.2 Brukeradministrasjon

- [x] CRUD for ansatte
- [x] Søk og filtrer ansatte

### 4.3 Skiftadministrasjon

- [x] Opprett, rediger, slett skift
- [x] Koble skift til ansatte
- [x] Skiftkalender (visuelt)

### 4.4 Håndtering av forespørsler

- [x] Liste og godkjenning/avvisning av fraværsforespørsler
- [x] Liste og godkjenning/avvisning av bytteforespørsler

### 4.5 Rapporter & Statistikk

- [ ] Timer per ansatt/avdeling/periode
- [ ] Eksport til CSV

---

## ⚡ M5 – Sanntid & Chat

### 5.1 Sanntid (WebSocket)

- [x] Socket.io i NestJS backend
- [x] Emit & lytte til events (skift, forespørsler)

### 5.2 Mobilapp

- [ ] Oppdater UI live ved skift- og forespørselsendringer
- [ ] Push-varsler med Expo

### 5.3 Chat

- [x] Opprett og bli med i chat-rom
- [x] Send og motta meldinger live
- [x] Direktemeldinger & grupper

---

## 🧪 M6 – Deployment

### 6.3 Deployment

- [ ] CI/CD med GitHub Actions (test + deploy)
- [ ] Docker Compose for lokal testing
- [ ] Backend: Azure App Service
- [ ] Mobilapp: Deploy til App Store og Play Store
