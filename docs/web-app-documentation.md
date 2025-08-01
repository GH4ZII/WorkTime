# Web App Dokumentasjon

## Oversikt

Web-applikasjonen er bygget med Next.js og fungerer som et administrasjonspanel for WorkTime-systemet. Den gir admin full kontroll over skift, ansatte, forespørsler og live chat-funksjonalitet.

## Teknisk Stack

- **Framework**: Next.js 15.3.4
- **Autentisering**: Cookie-basert med JWT tokens
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client for live chat
- **Språk**: TypeScript
- **UI**: Material-UI med Emotion CSS-in-JS

## Prosjektstruktur

```
apps/web/
├── _app.tsx                 # Hovedapp-komponent med ChatProvider
├── middleware.ts            # Next.js middleware for autentisering
├── pages/
│   ├── _document.tsx        # HTML-dokument template
│   ├── index.tsx           # Hovedsiden (Admin Dashboard)
│   ├── login.tsx           # Innloggingsside
│   ├── skift.tsx           # Skift-administrasjon
│   ├── medarbeidere.tsx    # Ansatte-administrasjon
│   ├── bytteforesporsel.tsx # Skift-bytte forespørsler
│   ├── fravaersforesporsel.tsx # Fraværsforespørsler
│   ├── meldinger.tsx       # Live chat-system
│   ├── historikk.tsx       # Historikk og rapporter
│   └── statistikk.tsx      # Statistikk og analytics
├── components/
│   ├── Layout.tsx          # Hovedlayout-komponent
│   ├── Sidebar.tsx         # Navigasjonssidebar
│   └── Chat.tsx            # Chat-komponent
├── context/
│   └── ChatContext.tsx     # WebSocket context for live chat
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

## Hovedsider og Funksjonalitet

### Dashboard (`/`)
- **Funksjon**: Oversikt over systemet
- **Innhold**: Velkomstmelding og navigasjon til andre seksjoner

### Skift-administrasjon (`/skift`)
- **Funksjon**: Administrere skift og arbeidstider
- **Features**:
  - Opprette nye skift med ansatt, dato, tid og lokasjon
  - Kalender-visning med tabs (i dag, siste uke, siste måned)
  - Redigere og slette eksisterende skift
  - Visning av skift med ansatt navn og varighet
- **API-endepunkter**: `/shifts` (GET, POST, PUT, DELETE)

### Ansatte-administrasjon (`/medarbeidere`)
- **Funksjon**: Administrere ansatte og brukerkontoer
- **Features**:
  - Oversikt over alle ansatte med detaljer
  - Legge til nye ansatte med navn, e-post, rolle, telefon
  - Redigere eksisterende ansatte
  - Slette ansatte (med cascade delete av relatert data)
  - Automatisk ansettelsesdato (kan settes manuelt)
- **API-endepunkter**: `/users` (GET, POST, PUT, DELETE)

### Skift-bytte forespørsler (`/bytteforesporsel`)
- **Funksjon**: Håndtere forespørsler om å bytte skift
- **Features**:
  - Visning av alle forespørsler med ansatt navn og skift-detaljer
  - Godkjenne eller avvise forespørsler
  - Visning av skift som skal byttes med dato/tid
  - Status-indikatorer (venter, godkjent, avvist)
- **API-endepunkter**: `/shift-swap-requests` (GET, POST, PUT, DELETE)

### Fraværsforespørsler (`/fravaersforesporsel`)
- **Funksjon**: Håndtere forespørsler om fravær
- **Features**:
  - Visning av fraværsforespørsler med ansatt navn og periode
  - Godkjenne eller avvise forespørsler
  - Formatert visning av datoer på norsk
  - Status-håndtering
- **API-endepunkter**: `/time-off-requests` (GET, POST, PUT, DELETE)

### Live Chat (`/meldinger`)
- **Funksjon**: Sanntids kommunikasjon mellom admin og ansatte
- **Features**:
  - WebSocket-basert live chat
  - Chat-rom administrasjon
  - Sanntids meldingsutveksling
  - Typing indicators
  - Persistent message storage
  - Cross-platform støtte (web + mobil)
- **API-endepunkter**: `/chatrooms` (GET, POST, PUT, DELETE)
- **WebSocket**: Socket.IO for real-time kommunikasjon

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
- ChatProvider for WebSocket-tilkobling
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

### `ChatContext.tsx`

**Funksjon**: Global state management for WebSocket-tilkobling

**Hovedfunksjoner**:
- WebSocket-tilkobling til chat-server
- Room management (join/leave)
- Message sending
- Connection status tracking

```typescript
interface ChatContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string, senderId: string) => void;
}
```

### `Layout.tsx`

**Funksjon**: Hovedlayout-komponent med sidebar og navigasjon

**Features**:
- Responsiv sidebar med navigasjonslenker
- Konsistent layout på tvers av sider
- Material-UI styling

### `Chat.tsx`

**Funksjon**: Chat-komponent for live messaging

**Features**:
- Real-time message display
- Message input med Enter-støtte
- Typing indicators
- Auto-scroll til nyeste melding
- Message bubbles med sender info og timestamp

## Styling og UI

### Material-UI Integration

- **Theme Provider**: Sentral tema-konfigurasjon i `_app.tsx`
- **CssBaseline**: Normaliserer stiler på tvers av nettlesere
- **Responsive Design**: Bruker MUI's Grid og Container komponenter
- **Custom Components**: Inline styles for spesialiserte komponenter

### Emotion CSS-in-JS

- **Server-side Rendering**: Stiler injiseres i `<head>` via `_document.tsx`
- **Cache Management**: `createEmotionCache.ts` håndterer CSS-caching
- **Performance**: Kritiske stiler ekstraheres for raskere lasting

### Responsive Design

- **Mobile-first**: Alle komponenter er mobile-responsive
- **Grid Layout**: Bruker CSS Grid for fleksibel layout
- **Breakpoints**: Material-UI breakpoints for konsistent responsivitet

## Real-time Funksjonalitet

### WebSocket Integration

**Chat System**:
- Socket.IO client for real-time kommunikasjon
- Automatic reconnection ved tap av tilkobling
- Room-based messaging
- Typing indicators
- Message persistence

**Event Handling**:
```typescript
// Join chat room
socket.emit('joinRoom', roomId);

// Send message
socket.emit('sendMessage', { roomId, message: { content, senderId } });

// Receive message
socket.on('newMessage', (message) => {
  // Update UI with new message
});
```

## API-integrasjon

### Backend-kommunikasjon

**Base URL**: `http://10.129.48.163:3001`

**Endepunkter**:
- **Autentisering**: `/auth/login`
- **Skift**: `/shifts`
- **Ansatte**: `/users`
- **Skift-bytte**: `/shift-swap-requests`
- **Fravær**: `/time-off-requests`
- **Chat**: `/chatrooms`
- **WebSocket**: `ws://10.129.48.163:3001`

**HTTP Client**: Axios med `withCredentials: true`


## Sikkerhet

### Autentisering
- **JWT Tokens**: Brukes for session management
- **Cookie-basert**: Tokens lagres som HTTP cookies
- **Middleware Protection**: Alle sider unntatt login krever autentisering
- **Session validation**: Automatisk validering av tokens

### Sikkerhetsforbedringer for Produksjon
- [ ] HTTP-only cookies for bedre sikkerhet
- [ ] CSRF beskyttelse
- [ ] Rate limiting på login-endepunkter
- [ ] HTTPS enforcement
- [ ] Content Security Policy (CSP)

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
- **Real-time**: Socket.IO Client
- **Types**: Lokale type-definisjoner

### Development Workflow
1. **Hot reloading**: Automatisk oppdatering ved kodeendringer
2. **Type checking**: TypeScript type checking
3. **Linting**: ESLint for kodekvalitet
4. **Error boundaries**: Graceful error handling

## Fremtidige Forbedringer

### Teknisk
- [ ] State management (Redux/Zustand)
- [ ] Form validation (React Hook Form)
- [ ] Error boundaries
- [ ] Loading states og skeleton screens
- [ ] PWA-funksjonalitet
- [ ] Offline support
- [ ] Push notifications

### Funksjonalitet
- [ ] Advanced filtering og søk
- [ ] Export til PDF/Excel
- [ ] Dashboard widgets
- [ ] Customizable layouts
- [ ] Multi-language support
- [ ] Dark mode

### Sikkerhet
- [ ] Refresh token implementasjon
- [ ] Session timeout
- [ ] Two-factor authentication
- [ ] Audit logging
- [ ] Role-based access control

### Ytelse
- [ ] Virtual scrolling for store lister
- [ ] Image optimization
- [ ] Service worker caching
- [ ] Progressive loading
- [ ] Performance monitoring

