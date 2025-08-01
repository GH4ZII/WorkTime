# 📱 WorkTime

**WorkTime** er en komplett skift- og timeregistreringsapp for ansatte og administratorer.
Prosjektet består av web (adminpanel), mobilapp (ansatte), og et API, med delt kodebase via Turborepo.

---

## 🧱 Prosjektstruktur

```
WorkTime/
├── apps/
│   ├── web/       → Adminpanel med Next.js
│   ├── mobile/    → Ansatt-app med Expo (React Native)
│   └── api/       → Backend-API (NestJS + Prisma)
├── packages/
│   ├── ui/        → Delt komponentbibliotek (Button, Card, Calendar, ChatUI)
│   └── types/     → Delt TypeScript-typer (User, Shift, etc.)
├── docs/          → Dokumentasjon (arkitektur, funksjonalitet, chat-system)
├── prisma/        → Prisma schema & migrasjoner (under apps/api)
├── turbo.json     → Turborepo-konfig
├── tsconfig.json  → TypeScript-konfig for monorepo
└── README.md      → Du ser på denne filen!
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
# Web (Next.js) - http://localhost:3000
cd apps/web && npm run dev

# Mobil (Expo) - QR-kode for mobil
cd apps/mobile && npm run start

# API (NestJS) - http://localhost:3001
cd apps/api && npm run dev
```

---

## 📌 Funksjoner

### 🔐 Autentisering & Sikkerhet
* **Session-basert**: Cookie-basert autentisering med JWT
* **Rollebasert**: `ADMIN` vs. `EMPLOYEE` med forskjellige tilganger
* **Middleware**: Beskyttede ruter og automatisk redirect

### 💾 Ansattstyring
* **CRUD-operasjoner**: Legg til, rediger, slett ansatte
* **Ansettelsesdato**: Manuell setting med dagens dato som standard
* **Avdeling & rolle**: Organisering av ansatte

### 📅 Skiftstyring
* **Kalender-visning**: Dag, uke, måned med tabs
* **CRUD-operasjoner**: Opprett, rediger, slett skift
* **Ansatt-tildeling**: Koble skift til spesifikke ansatte
* **Admin-kontroll**: Full kontroll over alle skift

### 📬 Forespørsler
* **Fraværsforespørsler**: Ferie, sykdom, annet
* **Skiftbytte**: Ansatte kan bytte skift med hverandre
* **Godkjenning**: Admin godkjenner/avslår forespørsler
* **Historikk**: Oversikt over alle forespørsler

### 💬 Live Chat
* **WebSocket**: Sanntids kommunikasjon med Socket.IO
* **Direktemeldinger**: Ansatt-til-ansatt og admin-til-ansatt
* **Gruppechat**: Flere deltakere i samme chat
* **Typing indicators**: Viser når noen skriver
* **Persistent**: Meldinger lagres i database

### 📊 Statistikk & Rapporter
* **Timeregistrering**: Logg arbeidstimer
* **Rapporter**: Timer per bruker/avdeling/periode
* **Oversikt**: Dashboard med viktig informasjon

---

## 📚 Dokumentasjon

* **[Arkitektur](docs/architecture.md)** - Systemarkitektur og design
* **[Funksjonalitet](docs/functionality.md)** - Detaljert funksjonsbeskrivelse
* **[Chat System](docs/chat-system.md)** - Live chat implementasjon
* **[Web App](docs/web-app-documentation.md)** - Adminpanel dokumentasjon
* **[Database](docs/database.md)** - Database-skjema og relasjoner

---

## 📚 Utvikling

### Miljøvariabler
```bash
# API (.env)
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
PORT=3001

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
```

### Testing
```bash
# API tester
cd apps/api && npm run test

# Web tester
cd apps/web && npm run test
```

---

## 🚀 Deployment

### Produksjon
* **Web**: Vercel/Netlify
* **API**: Railway/Heroku
* **Database**: PostgreSQL (Railway/Supabase)
* **Mobile**: Expo EAS Build

### Miljøer
* **Development**: Lokal utvikling
* **Staging**: Test-miljø
* **Production**: Live applikasjon

---

