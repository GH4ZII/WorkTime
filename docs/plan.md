# 🚧 Utviklingsplan for WorkTime

---

## 📅 Milepæler

1. **M1 – Database & API** (FERDIG)
2. **M2 – Design & prototyping** (FERDIG)
3. **M3 – Mobil-app CRUD + Auth**
4. **M4 – Web-admin CRUD + Auth**
5. **M5 – Sanntid (live-update & chat)**
6. **M6 – Testing, dokumentasjon & deployment**

---

## 🧱 Fase 1: Database & API (M1)

- [x] Definere datamodeller (`User`, `Shift`, `TimeOffRequest`, `ShiftSwapRequest`, `WorkLog`, `Notification`, `Chat*`)
- [x] Implementere Prisma-schema & migrasjoner
- [x] Koble mot PostgreSQL og verifisere tabeller i pgAdmin
- [ ] Skriv grunnleggende CRUD-endepunkter for alle modeller

---

## 🎨 Fase 2: Design & prototyping (M2)

- [ ] Lage wireframes i Figma:
    - Innlogging
    - Ansatt-dashboard
    - Admin-dashboard
    - Kalender-visning
    - Chat-UI
- [ ] Bryte opp i gjenbrukbare komponenter: Header, Button, Card, Calendar, ChatMessage

---

## 📱 Fase 3: Mobil-app (M3)

### 3.1 Autentisering

- [ ] `POST /auth/login` → lagre JWT i SecureStore / AsyncStorage
- [ ] `GET /users/me` → vis profil

### 3.2 Skift-flyt

- [ ] `/shifts` (GET) → Mine skift
- [ ] `/shifts` (POST/PUT/DELETE) → ADMIN-only (venter til M4)
- [ ] Skjerm: Liste, detaljer, notater

### 3.3 Forespørsler

- [ ] `/time-off-requests` (POST, GET egen historikk)
- [ ] `/shift-swap-requests` (POST, GET egen historikk)

---

## 🖥️ Fase 4: Web-admin (M4)

### 4.1 Autentisering & roller

- [ ] Login-side for admin
- [ ] Middleware: `@Roles(ADMIN)`

### 4.2 CRUD for skift & brukere

- [ ] `/users` (GET, POST, PUT, DELETE)
- [ ] `/shifts` (GET alle, POST, PUT, DELETE)
- [ ] Visning: Tabell + kalender

### 4.3 Håndtering av forespørsler

- [ ] Liste og godkjenn/avvis for `/time-off-requests`
- [ ] Liste og godkjenn/avvis for `/shift-swap-requests`

---

## ⚡ Fase 5: Sanntid & chat (M5)

- [ ] Sett opp WebSocket-gateway i NestJS (socket.io)
- [ ] Emit events:
    - `shift.created` / `shift.updated` / `shift.deleted`
    - `timeOffRequest.*` / `swapRequest.*`
- [ ] Frontend/web: lytte på events og oppdatere UI «live»
- [ ] Mobilapp: lytte på events, push-varsler (Expo Notifications)
- [ ] Chat-modul:
    - `chat.room.join` / `chat.message`

---

## 🔧 Fase 6: Testing, dokumentasjon & deployment (M6)

### 6.1 Testing

- [ ] API-e2e-tester (Jest + Supertest)
- [ ] Enhetstester for services
- [ ] Manuelle tester i Expo og nettleser

### 6.2 Dokumentasjon

- [ ] Swagger i NestJS (`@nestjs/swagger` på `/docs`)
- [ ] Oppdater `docs/architecture.md` med endelig ER-diagram
- [ ] Oppdater `docs/functionality.md` med sanntid & chat

### 6.3 Deployment & CI

- [ ] Legg til GitHub Actions:
    - `npm test` + `prisma migrate deploy` ved push til main
- [ ] Docker-Compose for lokal kjøring (api + db)
- [ ] Deploy backend til Vercel/Azure
- [ ] Deploy mobilapp til App Store / Play Store

---

## ✨ Ekstra tips & testdata

- Lag seed-skript i Prisma for å fylle på:
    - 3 ansatte, 5 skift, 2 ferieforespørsler
- Jobb iterativt: Få én full flyt (login → list shifts) helt ferdig før neste  
