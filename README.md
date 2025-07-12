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
