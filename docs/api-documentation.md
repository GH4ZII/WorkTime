# WorkTime API Dokumentasjon

## 📋 Innhold
1. [Arkitektur og Flow](#arkitektur-og-flow)
2. [Base URL og Autentisering](#base-url-og-autentisering)
3. [API Endepunkter](#api-endepunkter)
4. [Eksempler på Bruk](#eksempler-på-bruk)
5. [Feilhåndtering](#feilhåndtering)
6. [Best Practices](#best-practices)

---

## 🏗️ Arkitektur og Flow

### Struktur
API-en følger **NestJS Module Pattern** med følgende lag:

```
HTTP Request → Controller → Service → Prisma → Database → Response
```

### Komponenter

#### 1. **Module**
- **Rolle**: Organiserer og kobler sammen controllers og services
- **Eksempel**: `UsersModule` registrerer `UsersController` og `UsersService`

#### 2. **Controller**
- **Rolle**: Håndterer HTTP requests og definerer API-endepunkter
- **Flow**: Mapper HTTP-metoder til service-metoder
- **Eksempel**: `@Get()` → `findAll()` → `userService.findAll()`

#### 3. **Service**
- **Rolle**: Inneholder forretningslogikk og database-operasjoner
- **Flow**: Utfører operasjoner mot databasen via Prisma
- **Eksempel**: `findAll()` → Prisma query → Return data

#### 4. **DTO (Data Transfer Object)**
- **Rolle**: Validerer og type-sikrer inngående data
- **Eksempel**: `CreateUserDto` validerer brukerdata før lagring

---

## 🌐 Base URL og Autentisering

### Base URL
```
http://localhost:3001
```

### Autentisering
API-en bruker JWT-tokens for autentisering. Få token via login-endepunktet:

```javascript
// Login for å få token
const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123'
    })
});

const { access_token } = await response.json();
```

### Bruk av Token
```javascript
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
};
```

---

## 📡 API Endepunkter

### 🔐 Autentisering

#### POST /auth/login
**Beskrivelse**: Logger inn bruker og returnerer JWT-token

**Request Body**:
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response**:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👥 Brukere (Users)

#### GET /users
**Beskrivelse**: Henter alle brukere

**Response**:
```json
[
    {
        "id": "user-123",
        "name": "Ola Nordmann",
        "email": "ola@example.com",
        "phone": "12345678",
        "role": "USER"
    }
]
```

#### GET /users/:id
**Beskrivelse**: Henter spesifikk bruker

#### POST /users
**Beskrivelse**: Oppretter ny bruker

**Request Body**:
```json
{
    "name": "Kari Hansen",
    "email": "kari@example.com",
    "phone": "87654321",
    "password": "sikkerpassord123",
    "role": "USER"
}
```

#### PUT /users/:id
**Beskrivelse**: Oppdaterer bruker

#### DELETE /users/:id
**Beskrivelse**: Sletter bruker

---

### 🕐 Skift (Shifts)

#### GET /shifts
**Beskrivelse**: Henter alle skift

#### GET /shifts/:id
**Beskrivelse**: Henter spesifikt skift

#### POST /shifts
**Beskrivelse**: Oppretter nytt skift

**Request Body**:
```json
{
    "userId": "user-123",
    "startTime": "2024-01-15T08:00:00Z",
    "endTime": "2024-01-15T16:00:00Z",
    "location": "Hovedkontor",
    "notes": "Møte med kunde kl 10:00",
    "createdBy": "admin-456"
}
```

#### PUT /shifts/:id
**Beskrivelse**: Oppdaterer skift

#### DELETE /shifts/:id
**Beskrivelse**: Sletter skift

---

### 📝 Arbeidslogger (Worklog)

#### GET /worklog
**Beskrivelse**: Henter alle arbeidslogger

#### GET /worklog/:id
**Beskrivelse**: Henter spesifikk arbeidslogg

#### POST /worklog
**Beskrivelse**: Oppretter ny arbeidslogg

**Request Body**:
```json
{
    "startTime": "2024-01-15T08:00:00Z",
    "endTime": "2024-01-15T16:00:00Z",
    "userId": "user-123",
    "shiftId": "shift-456",
    "notes": "Arbeidet med prosjekt A"
}
```

#### PUT /worklog/:id
**Beskrivelse**: Oppdaterer arbeidslogg

#### DELETE /worklog/:id
**Beskrivelse**: Sletter arbeidslogg

---

### 🏖️ Fritidsforespørsler (Time Off Requests)

#### GET /time-off-requests
**Beskrivelse**: Henter alle fritidsforespørsler

#### GET /time-off-requests/:id
**Beskrivelse**: Henter spesifikk fritidsforespørsel

#### POST /time-off-requests
**Beskrivelse**: Oppretter ny fritidsforespørsel

#### PUT /time-off-requests/:id
**Beskrivelse**: Oppdaterer fritidsforespørsel

#### DELETE /time-off-requests/:id
**Beskrivelse**: Sletter fritidsforespørsel

---

### 🔄 Skiftbytteforespørsler (Shift Swap Requests)

#### GET /shift-swap-requests
**Beskrivelse**: Henter alle skiftbytteforespørsler

#### GET /shift-swap-requests/:id
**Beskrivelse**: Henter spesifikk skiftbytteforespørsel

#### POST /shift-swap-requests
**Beskrivelse**: Oppretter ny skiftbytteforespørsel

#### PUT /shift-swap-requests/:id
**Beskrivelse**: Oppdaterer skiftbytteforespørsel

#### DELETE /shift-swap-requests/:id
**Beskrivelse**: Sletter skiftbytteforespørsel

---

### 🔔 Varsler (Notifications)

#### GET /notifications/user/:userId
**Beskrivelse**: Henter alle varsler for spesifikk bruker

#### POST /notifications
**Beskrivelse**: Oppretter nytt varsel

#### PATCH /notifications/:id/status
**Beskrivelse**: Oppdaterer lesestatus på varsel

**Request Body**:
```json
{
    "read": true
}
```

#### DELETE /notifications/:id
**Beskrivelse**: Sletter varsel

---

### 💬 Chat

#### GET /chatrooms
**Beskrivelse**: Henter alle chatrom

#### GET /chatrooms/:id
**Beskrivelse**: Henter spesifikt chatrom

#### POST /chatrooms
**Beskrivelse**: Oppretter nytt chatrom

#### PATCH /chatrooms/:id
**Beskrivelse**: Oppdaterer chatrom

#### POST /chatrooms/:id/members
**Beskrivelse**: Legger til medlemmer i chatrom

#### DELETE /chatrooms/:id/members
**Beskrivelse**: Fjerner medlemmer fra chatrom

#### GET /chatrooms/:id/messages
**Beskrivelse**: Henter alle meldinger i chatrom

#### POST /chatrooms/:id/messages
**Beskrivelse**: Legger til ny melding i chatrom

---

## 💻 Eksempler på Bruk

### JavaScript/TypeScript

#### Hente alle ansatte
```javascript
const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        console.log('Brukere:', users);
        return users;
    } catch (error) {
        console.error('Feil ved henting av brukere:', error);
        throw error;
    }
};
```

#### Opprette ny bruker
```javascript
const createUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newUser = await response.json();
        console.log('Ny bruker opprettet:', newUser);
        return newUser;
    } catch (error) {
        console.error('Feil ved opprettelse av bruker:', error);
        throw error;
    }
};

// Bruk
const newUser = await createUser({
    name: "Per Hansen",
    email: "per@example.com",
    phone: "98765432",
    password: "sikkerpassord123",
    role: "USER"
});
```

#### Hente brukeres skift
```javascript
const fetchUserShifts = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3001/shifts?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const shifts = await response.json();
        console.log('Skift for bruker:', shifts);
        return shifts;
    } catch (error) {
        console.error('Feil ved henting av skift:', error);
        throw error;
    }
};
```

### React Hook Eksempel

```typescript
import { useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('http://localhost:3001/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Kunne ikke hente brukere');
            }
            
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ukjent feil');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, refetch: fetchUsers };
};

// Bruk i komponent
const UserList = () => {
    const { users, loading, error, refetch } = useUsers();

    if (loading) return <div>Laster...</div>;
    if (error) return <div>Feil: {error}</div>;

    return (
        <div>
            <h2>Ansatte</h2>
            <button onClick={refetch}>Oppdater</button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};
```

---

## ⚠️ Feilhåndtering

### HTTP Status Koder

- **200 OK**: Forespørsel vellykket
- **201 Created**: Ressurs opprettet
- **400 Bad Request**: Ugyldig forespørsel
- **401 Unauthorized**: Mangler autentisering
- **403 Forbidden**: Mangler tilgang
- **404 Not Found**: Ressurs ikke funnet
- **500 Internal Server Error**: Serverfeil

### Feil Response Format
```json
{
    "statusCode": 400,
    "message": "Validation failed",
    "error": "Bad Request"
}
```

### Feilhåndtering i Kode
```javascript
const handleApiCall = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
```

---

## 🎯 Best Practices

### 1. **Autentisering**
- Bruk alltid JWT-token i Authorization header
- Oppdater token når den utløper
- Implementer refresh token logikk

### 2. **Feilhåndtering**
- Håndter alle HTTP status koder
- Vis brukervennlige feilmeldinger
- Logg feil for debugging

### 3. **Performance**
- Bruk caching for ofte-hentede data
- Implementer paginering for store lister
- Bruk loading states

### 4. **Sikkerhet**
- Valider all input data
- Bruk HTTPS i produksjon
- Implementer rate limiting

### 5. **Kode Organisering**
- Bruk custom hooks for API-kall
- Sentraliser API-konfigurasjon
- Implementer error boundaries

---

## 🔧 Utvikling

### Starte API Server
```bash
cd apps/api
npm run start:dev
```

### Teste Endepunkter
Bruk Postman, Insomnia eller curl for å teste API-endepunkter:

```bash
# Test henting av brukere
curl -X GET http://localhost:3001/users \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test opprettelse av bruker
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "USER"
  }'
```

---

## 📚 Ytterligere Ressurser

- [NestJS Dokumentasjon](https://docs.nestjs.com/)
- [Prisma Dokumentasjon](https://www.prisma.io/docs/)
- [REST API Best Practices](https://restfulapi.net/)

---

*Dokumentasjon oppdatert: Januar 2024*