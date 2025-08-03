# Chat System Documentation

## Oversikt

Chat-systemet i WorkTime-applikasjonen er bygget med **WebSocket** (Socket.IO) for sanntids kommunikasjon mellom ansatte og admin. Systemet støtter både web-app og mobil-app, og gir mulighet for live messaging med typing indicators og persistent storage.

## Arkitektur

### Backend (NestJS + Socket.IO)
- **ChatGateway**: WebSocket-håndtering for sanntids kommunikasjon
- **ChatService**: Business logic for chat-rom og meldinger
- **ChatController**: REST API for chat-rom administrasjon
- **Prisma**: Database lagring av chat-rom og meldinger
- **JWT Authentication**: Sikker autentisering via JWT tokens

### Frontend (React + Socket.IO Client)
- **ChatContext**: Global state management for WebSocket-tilkobling
- **Chat Component**: UI for meldingsvisning og sending
- **Messages Page**: Oversikt over chat-rom og navigasjon

## Database Schema

### ChatRoom
```prisma
model ChatRoom {
  id          String       @id @default(uuid())
  name        String
  createdAt   DateTime     @default(now())
  members     ChatMember[]
  messages    Message[]
}
```

### ChatMember
```prisma
model ChatMember {
  id       String   @id @default(uuid())
  room     ChatRoom @relation(fields: [roomId], references: [id])
  roomId   String
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId   String
  joinedAt DateTime @default(now())
}
```

### Message
```prisma
model Message {
  id        String   @id @default(uuid())
  room      ChatRoom @relation(fields: [roomId], references: [id])
  roomId    String
  sender    User     @relation("SentMessages", fields: [senderId], references: [id], onDelete: Cascade)
  senderId  String
  content   String
  sentAt    DateTime @default(now())
}
```

## Autentisering og Sikkerhet

### JWT Authentication
Chat-systemet bruker JWT (JSON Web Tokens) for sikker autentisering:

#### JWT Strategy
```typescript
// apps/api/src/auth/strategies/jwt.strategy.ts
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request) => {
          return request?.cookies?.auth_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      email: payload.username, 
      name: payload.name,
      role: payload.role 
    };
  }
}
```

#### JWT Payload Structure
```typescript
{
  username: string,    // User email
  sub: string,         // User ID
  name: string,        // User name
  role: string         // User role (ADMIN/EMPLOYEE)
}
```

### Auth Endpoints
- `POST /auth/login` - Logg inn (LocalAuthGuard)
- `GET /auth/me` - Hent brukerdata (JwtAuthGuard)

## WebSocket Events

### Client → Server
- `joinRoom(roomId)`: Bli med i et chat-rom
- `leaveRoom(roomId)`: Forlat et chat-rom
- `sendMessage({roomId, message})`: Send en melding
- `typing({roomId, userId, isTyping})`: Indikerer at bruker skriver

### Server → Client
- `newMessage(message)`: Ny melding mottatt
- `userTyping({userId, isTyping})`: Bruker skriver/stopper å skrive
- `notification({userId, notification})`: Push-notifikasjon

## API Endepunkter

### Chat Rooms
- `GET /chatrooms` - Hent alle chat-rom
- `POST /chatrooms` - Opprett nytt chat-rom
- `GET /chatrooms/:id` - Hent spesifikt chat-rom
- `PATCH /chatrooms/:id` - Oppdater chat-rom
- `DELETE /chatrooms/:id` - Slett chat-rom

### Medlemmer
- `POST /chatrooms/:id/members` - Legg til medlemmer
- `DELETE /chatrooms/:id/members` - Fjern medlemmer

### Meldinger
- `GET /chatrooms/:id/messages` - Hent meldinger for rom
- `POST /chatrooms/:id/messages` - Send ny melding

## Data Flow

### 1. Opprette Chat-Rom
```
Admin → POST /chatrooms → ChatService.create() → Database
```

### 2. Bli Med i Rom
```
User → Socket.emit('joinRoom') → ChatGateway → Socket.join()
```

### 3. Sende Melding
```
User → Socket.emit('sendMessage') → ChatGateway → ChatService.addMessage() → Database → Broadcast til alle i rommet
```

### 4. Mottage Melding
```
Server → Socket.to(roomId).emit('newMessage') → Alle klienter i rommet → UI oppdateres
```

## Frontend Komponenter

### ChatContext
```typescript
interface ChatContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string, senderId: string) => void;
}
```

### Chat Component Props
```typescript
interface ChatProps {
  roomId: string;
  currentUserId: string;
}
```

### Message Interface
```typescript
interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
  };
  sentAt: string;
}
```

## Feilhåndtering

### Backend Feilhåndtering

#### ChatGateway
```typescript
@SubscribeMessage('sendMessage')
async handleMessage(client: Socket, payload: { roomId: string; message: CreateMessageDto }) {
  try {
    // Validate payload
    if (!payload.roomId || !payload.message || !payload.message.content || !payload.message.senderId) {
      return { success: false, error: 'Invalid message payload' };
    }
    
    // Save message to database
    const savedMessage = await this.chatService.addMessage(payload.roomId, payload.message);
    
    // Broadcast to all users in the room
    this.server.to(payload.roomId).emit('newMessage', savedMessage);
    
    return { success: true, message: savedMessage };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### ChatService
```typescript
async addMessage(roomId: string, dto: CreateMessageDto) {
  return this.prisma.message.create({
    data: {
      content: dto.content,
      roomId: roomId,
      senderId: dto.senderId,
    },
    include: {
      sender: { select: { id: true, name: true } }, // Inkluder info om avsender
    },
  });
}
```

### Frontend Feilhåndtering

#### Chat Component
```typescript
const handleSendMessage = () => {
  if (!newMessage.trim()) {
    return;
  }
  
  if (!isConnected) {
    setError('Ikke tilkoblet chat-server');
    return;
  }
  
  if (!roomId || !currentUserId) {
    setError('Mangler rom-ID eller bruker-ID');
    return;
  }
  
  try {
    sendMessage(roomId, newMessage, currentUserId);
    setNewMessage('');
    setError(null);
  } catch (error) {
    setError('Kunne ikke sende melding');
  }
};
```

#### ChatContext
```typescript
const sendMessage = (roomId: string, message: string, senderId: string) => {
  if (socket) {
    socket.emit('sendMessage', {
      roomId,
      message: {
        content: message,
        senderId,
      },
    });
  } else {
    throw new Error('Socket is not connected');
  }
};
```

### WebSocket Tilkobling
- Automatisk reconnect ved tap av tilkobling
- Feilhåndtering for connection errors
- Visuell indikator for tilkoblingsstatus

### API Feil
- Graceful error handling for API-kall
- Brukervennlige feilmeldinger
- Retry-logikk for mislykkede forespørsler

## Sikkerhet

### Autentisering
- WebSocket-tilkoblinger krever gyldig JWT token
- Alle API-kall bruker `withCredentials: true`
- JWT tokens sendes via cookies for sikkerhet
- Bruker-ID valideres på server-side

### Tilgangskontroll
- Kun medlemmer av chat-rommet kan se meldinger
- Admin kan administrere alle chat-rom
- Ansatte kan kun se rom de er medlem av

## Brukeropplevelse

### Features
- **Live messaging**: Sanntids oppdatering av meldinger
- **Typing indicators**: Viser når andre skriver (med 3-sekunders timeout)
- **Persistent storage**: Meldinger lagres i database
- **Cross-platform**: Fungerer på både web og mobil
- **Real-time notifications**: Umiddelbar varsling om nye meldinger
- **Error feedback**: Tydelige feilmeldinger for brukere

### UI/UX
- **Responsive design**: Tilpasser seg skjermstørrelse
- **Message bubbles**: Tydelig visning av egne vs andres meldinger
- **Timestamp**: Viser når meldinger ble sendt
- **Auto-scroll**: Automatisk scrolling til nyeste melding
- **Loading states**: Viser når data lastes
- **Disabled states**: Visuell feedback for deaktiverte knapper

## Ytelse

### Optimalisering
- **Message pagination**: Laster kun siste meldinger
- **Efficient broadcasting**: Kun til relevante brukere
- **Connection pooling**: Gjenbruker WebSocket-tilkoblinger
- **Memory management**: Rydder opp gamle meldinger

### Skalering
- **Room-based isolation**: Hver chat-rom er isolert
- **Horizontal scaling**: Støtter flere server-instanser
- **Database indexing**: Optimaliserte queries for meldinger

## Fremtidige Forbedringer

### Planlagte Features
- **File sharing**: Del filer i chat
- **Message reactions**: Emoji-reaksjoner på meldinger
- **Read receipts**: Viser når meldinger er lest
- **Message search**: Søk i chat-historikk
- **Voice messages**: Sprakmeldinger
- **Video calls**: Integrert video-chat

### Tekniske Forbedringer
- **Message encryption**: End-to-end kryptering
- **Push notifications**: Mobile push-varsler
- **Offline support**: Caching av meldinger
- **Message editing**: Rediger sendte meldinger
- **Message deletion**: Slett egne meldinger
- **Message threading**: Svar på spesifikke meldinger