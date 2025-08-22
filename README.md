# 📱 WorkTime

**WorkTime** er en komplett skift- og timeregistreringsapp for ansatte og administratorer.
Prosjektet består av web (adminpanel), mobilapp (ansatte), og et API, med delt kodebase via Turborepo.

---

## 🧱 Prosjektstruktur

```
WorkTime/
├── apps/
│   ├── web/       → Adminpanel med Next.js 15 + MUI 7
│   ├── mobile/    → Ansatt-app med Expo SDK 53 + React Native 0.79
│   └── api/       → Backend-API (NestJS 11 + Prisma 6 + PostgreSQL)
├── packages/
│   ├── ui/        → Delt komponentbibliotek (MUI + React Native Paper)
│   └── types/     → Delt TypeScript-typer (User, Shift, etc.)
├── docs/          → Dokumentasjon (arkitektur, funksjonalitet, chat-system)
├── prisma/        → Prisma schema & migrasjoner (under apps/api)
├── turbo.json     → Turborepo-konfig
├── tsconfig.json  → TypeScript-konfig for monorepo
└── README.md      
```

---

## 🚀 Kom i gang

```bash
# Installer alle workspaces
npm install

# Start alle i dev-modus
npm run dev
```

### Spesifikt

```bash
# Web (Next.js 15) - http://localhost:3000
cd apps/web && npm run dev

# Mobil (Expo SDK 53) - QR-kode for mobil
cd apps/mobile && npm run start

# API (NestJS 11) - http://localhost:3001
cd apps/api && npm run dev
```

---

## 📌 Funksjoner

### 🤖 AI-drevet Skiftplanlegging
* **Automatisk Skiftgenerering**: Bruker OpenAI GPT til å lage optimale skiftplaner
* **Uke- og Månedsplaner**: AI genererer skift basert på ansatte og fraværsforespørsler
* **Intelligent Planlegging**: Tar hensyn til stillingsprosent, tilgjengelighet og preferanser
* **Feilhåndtering**: Automatisk retry med forbedret prompt-håndtering

### 🔐 Autentisering & Sikkerhet
* **JWT + Cookie-basert**: Sikker autentisering med httpOnly cookies
* **Rollebasert**: `ADMIN` vs. `EMPLOYEE` med forskjellige tilganger
* **CORS-konfigurert**: Sikker kommunikasjon mellom frontend og backend
* **Middleware**: Beskyttede ruter og automatisk redirect

### 💾 Ansattstyring
* **CRUD-operasjoner**: Legg til, rediger, slett ansatte
* **Ansettelsesdato**: Manuell setting med dagens dato som standard
* **Stillingsprosent**: Fleksibel arbeidstid basert på stillingsprosent
* **Avdeling & rolle**: Organisering av ansatte

### 📅 Skiftstyring
* **Kalender-visning**: Dag, uke, måned med tabs
* **CRUD-operasjoner**: Opprett, rediger, slett skift
* **Ansatt-tildeling**: Koble skift til spesifikke ansatte
* **Admin-kontroll**: Full kontroll over alle skift
* **AI-assistert**: Automatisk generering av skiftplaner

### 📬 Forespørsler
* **Fraværsforespørsler**: Ferie, sykdom, annet med godkjenning
* **Skiftbytte**: Ansatte kan bytte skift med hverandre
* **Godkjenning**: Admin godkjenner/avslår forespørsler
* **Historikk**: Oversikt over alle forespørsler og deres status

### 💬 Live Chat
* **WebSocket**: Sanntids kommunikasjon med Socket.IO
* **Direktemeldinger**: Ansatt-til-ansatt og admin-til-ansatt
* **Gruppechat**: Flere deltakere i samme chat
* **Typing indicators**: Viser når noen skriver
* **Persistent**: Meldinger lagres i database
* **Real-time**: Umiddelbar oppdatering av chat

### 📊 Statistikk & Rapporter
* **Timeregistrering**: Logg arbeidstimer med start/stopp
* **Rapporter**: Timer per bruker/avdeling/periode
* **Oversikt**: Dashboard med viktig informasjon
* **Analytics**: Detaljert innsikt i arbeidstid

---

## 🛠️ Teknisk Stack

### Frontend
* **Web**: Next.js 15, React 19, MUI 7, Framer Motion
* **Mobile**: Expo SDK 53, React Native 0.79, React Native Paper
* **State Management**: React Context + Hooks
* **Styling**: MUI (web), React Native Paper (mobile)

### Backend
* **Framework**: NestJS 11 med TypeScript 5.7
* **Database**: PostgreSQL med Prisma 6 ORM
* **Authentication**: JWT + Passport.js
* **Real-time**: Socket.IO for WebSocket-kommunikasjon
* **AI Integration**: OpenAI GPT API for skiftplanlegging

---

## 📚 Dokumentasjon

* **[Arkitektur](docs/architecture.md)** - Systemarkitektur og design
* **[AI Workflow](docs/ai-workflow-explained.md)** - AI-drevet skiftplanlegging
* **[Chat System](docs/chat-system.md)** - Live chat implementasjon
* **[Web App](docs/web-app-documentation.md)** - Adminpanel dokumentasjon
* **[Database](docs/database.md)** - Database-skjema og relasjoner
* **[Auth Flow](docs/AuthFlow.md)** - Autentiseringsflyt

---

## 🚀 Utvikling

### Miljøvariabler
```bash
# API (.env)
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
PORT=3001
OPENAI_API_KEY="your-openai-key"

# Web (.env.local)
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### Database
```bash
# Migrasjoner
cd apps/api
npx prisma migrate dev

# Se data
npx prisma studio

# Generer Prisma Client
npx prisma generate
```

---