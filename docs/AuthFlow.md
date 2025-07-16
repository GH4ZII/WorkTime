# 🔐 Autentiseringsflyt i WorkTime

Denne dokumentasjonen beskriver hvordan innlogging og autentisering fungerer i WorkTime-prosjektet, både på backend (NestJS) og frontend (Expo).

---

## 🧩 Komponentoversikt

### Backend (NestJS)

- `auth.controller.ts`: Håndterer `/auth/login`-endepunktet.
- `auth.service.ts`: Verifiserer brukerinformasjon og genererer JWT.
- `local.strategy.ts`: Bruker `passport-local` for å autentisere med e-post og passord.
- `local-auth.guard.ts`: Brukes som NestJS `Guard` for å aktivere strategien.
- `auth.module.ts`: Importerer og kobler sammen auth-relaterte providers og strategy.

### Frontend (Expo)

- `LoginScreen.tsx`: UI for å skrive inn e-post og passord og initiere login.
- `AuthContext.tsx`: Holder global auth state, lagrer JWT-token og setter axios headers.

---

## 🔁 Autentiseringsflyt

1. **Bruker fyller ut innloggingsskjema i `LoginScreen.tsx`.**
2. `signIn(email, password)` fra `AuthContext` kalles.
3. Det sendes en `POST`-forespørsel til `http://<api-url>/auth/login` med e-post og passord.
4. **NestJS backend** mottar forespørselen via `AuthController`.
5. `LocalAuthGuard` aktiverer `LocalStrategy`, som:
    - Henter bruker fra database (via `auth.service.ts`)
    - Sammenligner passord (f.eks. med bcrypt)
6. Ved suksess returnerer `AuthService` en JWT (`access_token`).
7. JWT lagres i `SecureStore` og axios konfigureres med `Authorization: Bearer <token>`.
8. Brukeren er nå logget inn og `isAuthenticated` settes til `true`.

---

## 🔒 Token-håndtering

- **Lagring**: JWT lagres sikkert med `expo-secure-store`.
- **Automasjon**: Axios headers blir automatisk satt med tokenet.
- **Ved utlogging**: Token slettes fra `SecureStore` og axios headers ryddes.

---

## 👥 Rollehåndtering

- Backend kan bruke `@Roles()`-decorator og custom guards for å skille mellom `EMPLOYEE` og `ADMIN`.
- Frontend kan vise skjermbilder basert på `user.role` (må hentes i tillegg til token hvis nødvendig).

---

## 📦 API-eksempel

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "bruker@eksempel.no",
  "password": "hemmelig"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```
