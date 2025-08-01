# 🏗️ WorkTime Arkitektur

## Oversikt

WorkTime er bygget som en moderne, skalerbar applikasjon med monorepo-struktur. Systemet består av tre hovedkomponenter: web-adminpanel, mobil-app for ansatte, og et robust backend-API.

---

## 1. Monorepo-struktur

Prosjektet bruker én Git-repositorie (monorepo) med følgende hovedmapper:

```
WorkTime/
├── apps/           ← Kjørbare applikasjoner
│   ├── web/        ← Administrasjonsportal (Next.js)
│   ├── mobile/     ← Mobilapp for ansatte (Expo)
│   └── api/        ← Backend-tjeneste (NestJS)
├── packages/       ← Gjenbrukbare biblioteker
│   ├── ui/         ← Felles React/React Native-komponenter
│   └── types/      ← Felles TypeScript-typer
└── docs/           ← Dokumentasjon
```

### Fordeler med Monorepo
* **Delt kodebase**: Enkel deling av komponenter og typer
* **Atomiske endringer**: Endringer på tvers av apper i samme commit
* **Konsistent tooling**: Samme linting, testing og bygg-prosesser
* **Enklere refactoring**: Endringer på tvers av hele systemet

---

## 2. Workspaces og Turborepo

### NPM Workspaces
* Defineres i rotens `package.json`
* Alle undermapper under `apps/*` og `packages/*` installeres automatisk
* Enkel dependency management på tvers av prosjekter

### Turborepo
Styrer bygg-, dev- og test-pipelines for alle pakker:

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Kommandoer
```bash
npm run dev      # Starter alle dev-servere parallelt
npm run build    # Bygger alle prosjekter i riktig rekkefølge
npm run lint     # Linter alle prosjekter
npm run test     # Tester alle prosjekter
```

---

## 3. Applikasjonsarkitektur

### 3.1 Web (Next.js) - Adminpanel

**Mappe**: `apps/web`
**Framework**: Next.js 15.3.4 med TypeScript
**Formål**: Administrasjonsportal for ledelse

#### Struktur
```
apps/web/
├── pages/           # Sidestruktur (routing)
│   ├── index.tsx    # Dashboard
│   ├── skift.tsx    # Skiftstyring
│   ├── medarbeidere.tsx # Ansattstyring
│   └── meldinger.tsx # Live chat
├── components/      # UI-komponenter
├── context/         # React Context (Auth, Chat)
├── middleware.ts    # Next.js middleware
└── _app.tsx         # Root component
```

#### Teknologier
* **Next.js**: Server-side rendering og routing
* **Material-UI**: Komponentbibliotek
* **Socket.IO Client**: Real-time kommunikasjon
* **Axios**: HTTP-klient med credentials

#### Port**: [http://localhost:3000](http://localhost:3000)

### 3.2 Mobile (Expo) - Ansatt-app

**Mappe**: `apps/mobile`
**Framework**: Expo (React Native) med TypeScript
**Formål**: Ansatte-brukerapp

#### Struktur
```
apps/mobile/
├── App.tsx          # Root component
├── src/
│   ├── screens/     # App-skjermer
│   ├── components/  # UI-komponenter
│   ├── navigation/  # React Navigation
│   └── context/     # State management
└── assets/          # Bilder og ikoner
```

#### Teknologier
* **Expo**: React Native framework
* **React Navigation**: Navigasjon mellom skjermer
* **Socket.IO Client**: Real-time kommunikasjon
* **AsyncStorage**: Lokal data-lagring

#### Port**: Expo CLI med QR-kode

### 3.3 API (NestJS) - Backend

**Mappe**: `apps/api`
**Framework**: NestJS med TypeScript
**Formål**: REST API og WebSocket-server

#### Struktur
```
apps/api/
├── src/
│   ├── app.module.ts    # Root module
│   ├── auth/            # Autentisering
│   ├── users/           # Brukerstyring
│   ├── shifts/          # Skiftstyring
│   ├── chat/            # Chat-system
│   ├── worklog/         # Timeregistrering
│   └── prisma.service.ts # Database service
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrasjoner
└── generated/           # Prisma client
```

#### Teknologier
* **NestJS**: Enterprise-grade Node.js framework
* **Prisma**: Type-safe database ORM
* **Socket.IO**: WebSocket-server for real-time
* **JWT**: Token-basert autentisering
* **PostgreSQL**: Relasjonsdatabase

#### Port**: [http://localhost:3001](http://localhost:3001)

---

## 4. Fellespakker

### 4.1 UI-komponentbibliotek

**Mappe**: `packages/ui/src`
**Formål**: Gjenbrukbare komponenter på tvers av web og mobile

```typescript
// Eksempel på delt komponent
export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}
```

### 4.2 Type-definisjoner

**Mappe**: `packages/types/src`
**Formål**: Delt TypeScript-interfaces og typer

```typescript
// Eksempel på delt type
export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'EMPLOYEE'
}
```

---

## 5. Database-arkitektur

### PostgreSQL Schema

```sql
-- Hovedtabeller
users           -- Ansatte og admin
shifts          -- Skift-informasjon
work_logs       -- Timeregistrering
time_off_requests    -- Fraværsforespørsler
shift_swap_requests  -- Skiftbytte-forespørsler
chat_rooms      -- Chat-rom
messages        -- Chat-meldinger
notifications   -- Push-varsler
```

### Prisma ORM
* **Type-safe**: Automatisk TypeScript-generering
* **Migrations**: Versjonert database-endringer
* **Relations**: Automatisk håndtering av relasjoner

---

## 6. Kommunikasjon og Real-time

### REST API
* **HTTP/HTTPS**: Standard REST-endepunkter
* **JWT Authentication**: Token-basert sikkerhet
* **CORS**: Cross-origin resource sharing

### WebSocket (Socket.IO)
* **Real-time chat**: Sanntids meldinger
* **Live updates**: Skift-endringer og forespørsler
* **Typing indicators**: Viser når noen skriver

### Event Flow
```
1. Bruker logger inn → JWT token genereres
2. WebSocket-tilkobling etableres
3. Real-time events sendes mellom klienter
4. Database oppdateres via REST API
```

---

## 7. Sikkerhet

### Autentisering
* **Session-based**: Cookie-basert med JWT
* **Role-based**: ADMIN vs EMPLOYEE tilganger
* **Middleware**: Beskyttede ruter

### Validering
* **DTOs**: Data Transfer Objects for input-validering
* **Prisma**: Type-safe database-operasjoner
* **CORS**: Begrenset cross-origin tilgang

---

## 8. Deployment og Miljøer

### Development
* **Lokal utvikling**: Alle tjenester kjører lokalt
* **Hot reload**: Automatisk oppdatering ved endringer
* **Database**: PostgreSQL via Docker

### Production
* **Web**: Vercel/Netlify
* **API**: Railway/Heroku
* **Database**: PostgreSQL (Railway/Supabase)
* **Mobile**: Expo EAS Build

---