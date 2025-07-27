# Web App Dokumentasjon

## Oversikt

Web-applikasjonen er bygget med Next.js og fungerer som et administrasjonspanel for WorkTime-systemet. Applikasjonen bruker Material-UI for styling og har en enkel autentiseringsflyt basert på cookies.

## Teknisk Stack

- **Framework**: Next.js 15.3.4
- **Styling**: Material-UI (MUI) med Emotion
- **Autentisering**: Cookie-basert med JWT tokens
- **HTTP Client**: Axios
- **Språk**: TypeScript

## Prosjektstruktur

```
apps/web/
├── _app.tsx                 # Hovedapp-komponent
├── middleware.ts            # Next.js middleware for autentisering
├── pages/
│   ├── _document.tsx        # HTML-dokument template
│   ├── index.tsx           # Hovedsiden (Admin Dashboard)
│   └── login.tsx           # Innloggingsside
├── utils/
│   └── createEmotionCache.ts # Emotion cache konfigurasjon
└── package.json
```

## Autentiseringsflyt

### 1. Når en admin åpner applikasjonen

Når en admin navigerer til web-applikasjonen, skjer følgende:

1. **Middleware-kontroll**: `middleware.ts` kjøres først
   - Sjekker om det finnes en `auth_token` cookie
   - Hvis ingen token finnes → omdirigerer til `/login`
   - Hvis token finnes → fortsetter til forespurt side

2. **Side-rendering**: Avhengig av autentiseringsstatus:
   - **Ikke autentisert**: Viser login-siden
   - **Autentisert**: Viser admin dashboard

### 2. Innloggingsprosess

1. **Login-side** (`/login`):
   - Admin fyller ut e-post og passord
   - Form submission sender data til API: `http://10.129.48.163:3001/auth/login`
   - Ved vellykket innlogging:
     - JWT token lagres som cookie: `auth_token=${response.data.access_token}`
     - Omdirigering til hovedsiden (`/`)

2. **Autentiseringsfeil**:
   - Viser feilmelding: "Feil brukernavn eller passord"
   - Bruker kan prøve igjen

### 3. Beskyttede sider

Alle sider unntatt `/login` krever autentisering:
- Middleware sjekker `auth_token` cookie
- Hvis token mangler → automatisk omdirigering til login
- Hvis token finnes → tilgang tillatt

## Komponenter og Filer

### `middleware.ts`

**Funksjon**: Autentiseringskontroll for alle sider

```typescript
export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    const { pathname } = req.nextUrl;

    // Tillat tilgang til login-siden uten autentisering
    if (pathname.startsWith('/login')) {
        return NextResponse.next();
    }

    // Omdiriger til login hvis ingen token
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
```

**Matcher-konfigurasjon**:
- Kjøres på alle sider unntatt API-kall og statiske filer
- Ekskluderer: `api`, `_next/static`, `_next/image`, `favicon.ico`

### `_document.tsx`

**Funksjon**: HTML-dokument template for server-side rendering

**Hovedfunksjoner**:
- Definerer HTML-struktur med norsk språk (`lang="no"`)
- Inkluderer Roboto font for Material-UI
- Håndterer Emotion CSS-injection for server-side rendering
- Sikrer at MUI-stiler lastes korrekt

**Emotion Server-side Rendering**:
```typescript
MyDocument.getInitialProps = async (ctx) => {
    // Oppretter Emotion cache
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    
    // Ekstraherer kritiske CSS-stiler
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    
    return {
        ...initialProps,
        emotionStyleTags, // Injiseres i <Head>
    };
};
```

### `_app.tsx`

**Funksjon**: Hovedapp-komponent som wrapper alle sider

**Hovedfunksjoner**:
- Material-UI Theme Provider
- CSS Baseline for konsistent styling
- Emotion cache håndtering
- Sentral tema-konfigurasjon

**Tema-konfigurasjon**:
```typescript
const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },    // Blå
        secondary: { main: '#dc004e' },   // Rød
    },
});
```

### `login.tsx`

**Funksjon**: Innloggingsside med form og autentisering

**Funksjonalitet**:
- E-post og passord input-felter
- Form validation
- API-kall til backend for autentisering
- Cookie-setting ved vellykket innlogging
- Feilhåndtering og brukervennlige meldinger

**API-integrasjon**:
```typescript
const response = await axios.post('http://10.129.48.163:3001/auth/login', {
    email,
    password,
});

// Lagrer JWT token som cookie
document.cookie = `auth_token=${response.data.access_token}; path=/;`;
```

### `index.tsx`

**Funksjon**: Admin Dashboard hovedside

**Innhold**:
- Velkomstmelding
- Enkel layout med sentrert innhold
- Responsivt design

## Styling og UI

### Material-UI Integration

- **Theme Provider**: Sentral tema-konfigurasjon i `_app.tsx`
- **CssBaseline**: Normaliserer stiler på tvers av nettlesere
- **Responsive Design**: Bruker MUI's Grid og Container komponenter

### Emotion CSS-in-JS

- **Server-side Rendering**: Stiler injiseres i `<head>` via `_document.tsx`
- **Cache Management**: `createEmotionCache.ts` håndterer CSS-caching
- **Performance**: Kritiske stiler ekstraheres for raskere lasting

## Sikkerhet

### Autentisering
- **JWT Tokens**: Brukes for session management
- **Cookie-basert**: Tokens lagres som HTTP cookies
- **Middleware Protection**: Alle sider unntatt login krever autentisering

### Sikkerhetsforbedringer for Produksjon
- [ ] HTTP-only cookies for bedre sikkerhet
- [ ] CSRF beskyttelse
- [ ] Rate limiting på login-endepunkter
- [ ] HTTPS enforcement

## API-integrasjon

### Backend-kommunikasjon
- **Base URL**: `http://10.129.48.163:3001`
- **Autentisering**: `/auth/login` endepunkt
- **HTTP Client**: Axios for API-kall

### Feilhåndtering
- Try-catch blokker for API-kall
- Brukervennlige feilmeldinger
- Console logging for debugging

## Utvikling og Deployment

### Scripts
```json
{
  "dev": "next dev",      // Utviklingsserver
  "build": "next build",  // Produksjonsbuild
  "start": "next start",  // Produksjonsserver
  "lint": "next lint"     // Linting
}
```

### Avhengigheter
- **Core**: Next.js, React, TypeScript
- **UI**: Material-UI, Emotion
- **HTTP**: Axios
- **Types**: Lokale type-definisjoner

## Fremtidige Forbedringer

### Funksjonalitet
- [ ] Admin dashboard med faktisk funksjonalitet
- [ ] Brukeradministrasjon
- [ ] Shift management
- [ ] Rapporter og statistikk

### Teknisk
- [ ] State management (Redux/Zustand)
- [ ] Form validation (React Hook Form)
- [ ] Error boundaries
- [ ] Loading states og skeleton screens
- [ ] PWA-funksjonalitet

### Sikkerhet
- [ ] Refresh token implementasjon
- [ ] Session timeout
- [ ] Two-factor authentication
- [ ] Audit logging

## Troubleshooting

### Vanlige Problemer

1. **Middleware kjører ikke**:
   - Sjekk matcher-konfigurasjon i `middleware.ts`
   - Verifiser at filen er i riktig plassering

2. **Stiler lastes ikke**:
   - Sjekk Emotion cache konfigurasjon
   - Verifiser at `_document.tsx` er korrekt satt opp

3. **Autentisering fungerer ikke**:
   - Sjekk API-endepunkt URL
   - Verifiser cookie-setting
   - Kontroller backend-tilgjengelighet

### Debugging
- Bruk browser developer tools for cookie-inspisering
- Console logging i middleware og login-komponenter
- Network tab for API-kall debugging 