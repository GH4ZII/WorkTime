
Arkitektur i WorkTime-prosjektet
---------------------------------------

Denne delen gir en enkel, men detaljert oversikt over hvordan **WorkTime**-prosjektet er satt opp, hvilke deler som finnes, og hvordan de samarbeider.

## 1. Monorepo-struktur

Prosjektet bruker én Git-repositorie (monorepo) med følgende hovedmapper:

```
worktime/
├── apps/       ← Kjørbare applikasjoner
│   ├── web/    ← Administrasjonsportal (Next.js)
│   ├── mobile/ ← Mobilapp for ansatte (Expo)
│   └── api/    ← Backend-tjeneste (NestJS)
├── packages/   ← Gjenbrukbare biblioteker
│   ├── ui/     ← Felles React/React Native-komponenter
│   └── types/  ← Felles TypeScript-typer
└── docs/       ← Dokumentasjon
```

* **apps/**: Inneholder selve applikasjonene som kjøres.
* **packages/**: Inneholder modulene som deles mellom applikasjonene.
* **docs/**: Egen dokumentasjonsside.

## 2. Workspaces og Turborepo

* Prosjektet bruker **npm-workspaces** definert i rotens `package.json`. Alle undermapper under `apps/*` og `packages/*` hentes automatisk ved `npm install`.
* **Turborepo** styrer bygg-, dev- og test-pipelines for alle pakker. Konfigurasjon i `turbo.json` (eller `turbo.config.js`) definerer:

    * **tasks** (tidligere `pipeline`): `dev`, `build`, `lint`, `test`.
    * **dependsOn**: Rekkefølge basert på avhengigheter (f.eks. bygg av UI før web).
    * **outputs**: Filmønstre som caches.

Kommandoer:

* `npm run dev` → starter dev-servere for **web**, **mobile** og **api** parallelt.
* `npm run build` → bygger alle prosjekter i riktig rekkefølge.

## 3. Beskrivelse av appene

### 3.1. Web (Next.js)

* **Mappe**: `apps/web`
* **Framework**: Next.js med React og TypeScript
* **Formål**: Administrasjonsportal for ledelse
* **Viktige elementer**:

    * `pages/` for sidestruktur
    * `components/` for UI-komponenter (henter fra `ui`)
    * `public/` for statiske filer
* **Startkommando**: `npm run dev` → [http://localhost:3000](http://localhost:3000)

### 3.2. Mobile (Expo)

* **Mappe**: `apps/mobile`
* **Framework**: Expo (React Native) med TypeScript
* **Formål**: Ansatte-brukerapp
* **Viktige elementer**:

    * `App.tsx` som rotkomponent
    * `screens/` for ulike views
    * Asset-mappe for bilder og ikoner
* **Startkommando**: `npm run dev` → Expo CLI med QR-kode

### 3.3. API (NestJS)

* **Mappe**: `apps/api`
* **Framework**: NestJS med TypeScript
* **Formål**: Tilby API-endepunkter for web og mobile
* **Viktige elementer**:

    * `src/app.module.ts` for modul-oppsett
    * `controllers/` og `services/` for logikk
    * `prisma/` eller ORM for database (PostgreSQL)
* **Startkommando**: `npm run dev` → [http://localhost:3001](http://localhost:3001)

## 4. Fellespakker

### 4.1. UI-komponentbibliotek

* **Mappe**: `packages/ui/src`
* **Innhold**: Gjenbrukbare komponenter

### 4.2. Type-definisjoner

* **Mappe**: `packages/types/src`
* **Innhold**: TypeScript-interfaces og typer (f.eks. `User`, `Task`)
* **Bruk**: Importer med `import { User } from 'types'`

## 5. Database og miljø

* **Database**: PostgreSQL kjøres vanligvis via Docker Compose i prosjektroten.
* **Miljøvariabler**: Defineres i `.env`-filer for hver app (`apps/api/.env`, `apps/web/.env.local`).

## 6. Oppsummering

* Monorepo gir én samlet kodebase.
* Workspaces + Turborepo gir enkel installasjon, bygg og dev-oppsett.
* Klare skiller mellom apper (`apps/`) og delte biblioteker (`packages/`).
* Dokumentasjon i `docs/`

