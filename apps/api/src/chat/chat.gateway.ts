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
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
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
    console.log(`User joined room: ${roomId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
    console.log(`User left room: ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { roomId: string; message: CreateMessageDto }) {
    try {
      // Save message to database
      const savedMessage = await this.chatService.addMessage(payload.roomId, payload.message);
      
      // Broadcast to all users in the room
      this.server.to(payload.roomId).emit('newMessage', savedMessage);
      
      return { success: true, message: savedMessage };
    } catch (error) {
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