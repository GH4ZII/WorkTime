import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    server: Server;
    private connectedUsers;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, roomId: string): void;
    handleLeaveRoom(client: Socket, roomId: string): void;
    handleMessage(client: Socket, payload: {
        roomId: string;
        message: CreateMessageDto;
    }): Promise<{
        success: boolean;
        message: {
            id: string;
            sentAt: Date;
            roomId: string;
            senderId: string;
            content: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    handleTyping(client: Socket, payload: {
        roomId: string;
        userId: string;
        isTyping: boolean;
    }): void;
    sendNotificationToUser(userId: string, notification: any): void;
}
