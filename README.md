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
├── docs/          → Dokumentasjon (Docusaurus: intro, arkitektur, funksjonalitet)
├── prisma/        → Prisma schema & migrasjoner (under apps/api)
├── turbo.json     → Turborepo-konfig
├── tsconfig.json  → TypeScript-konfig for monorepo
└── README.md      → Du ser på denne filen!
```

---

## 🧭 Roadmap

1. **M1 – Database & API** (✅ ferdig)

    * Prisma-schema, migrasjoner, grunnleggende CRUD
2. **M2 – Design & prototyping** (✅ ferdig)

    * Figma-wireframes, komponentbibliotek i `packages/ui`
3. **M3 – Mobilapp (Expo)**

    * Autentisering, skiftvisning, forespørsler om fri/skiftbytte
4. **M4 – Adminpanel (Web)**

    * Brukeradmin, shift management, håndtere forespørsler
5. **M5 – Sanntid & chat**

    * WebSocket-gateway (NestJS) → live oppdateringer for skift og forespørsler
    * Live chat (socket.io) i web og mobil
6. **M6 – Testing, dokumentasjon & deployment**

    * Enhetstester, e2e-tester, Swagger, GitHub Actions, Docker-compose, deploy

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
# Web (Next.js)
cd apps/web && npm run dev

# Mobil (Expo)
cd apps/mobile && npm run start

# API (NestJS)
cd apps/api && npm run dev
```

---

## 📌 Funksjoner

* **Autentisering**: E-post + passord, JWT-basert.
* **Rollebasert**: `ADMIN` vs. `EMPLOYEE`.
* **Skiftstyring**: CRUD, kalender, notater, sted.
* **Forespørsler**: Fravær, ferie, skiftbytte med historikk.
* **Sanntid**: Live oppdateringer (shift.*, request.*), push-varsler.
* **Chat**: Direktemeldinger og gruppechat.
* **Statistikk & rapporter**: Timer per bruker/avdeling/periode.

---
