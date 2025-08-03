import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3000", "http://10.129.48.163:3000"],
    credentials: true
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // socketId -> userId

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
  }

  handleDisconnect(client: Socket) {
    // Remove user from connected users
    for (const [socketId, userId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(socketId);
        break;
      }
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { roomId: string; message: CreateMessageDto }) {
    try {      
      // Validate payload
      if (!payload.roomId || !payload.message || !payload.message.content || !payload.message.senderId) {
        console.error('ChatGateway: Invalid payload:', payload);
        return { success: false, error: 'Invalid message payload' };
      }
      
      // Save message to database
      const savedMessage = await this.chatService.addMessage(payload.roomId, payload.message);
      
      // Broadcast to all users in the room
      this.server.to(payload.roomId).emit('newMessage', savedMessage);
      
      return { success: true, message: savedMessage };
    } catch (error) {
      console.error('ChatGateway: Error handling message:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, payload: { roomId: string; userId: string; isTyping: boolean }) {
    client.to(payload.roomId).emit('userTyping', {
      userId: payload.userId,
      isTyping: payload.isTyping
    });
  }

  // Method to send notification to specific user
  sendNotificationToUser(userId: string, notification: any) {
    this.server.emit('notification', { userId, notification });
  }
}