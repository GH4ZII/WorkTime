import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatRoom, Message } from '@prisma/client';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatRoomDto: CreateChatDto): Promise<ChatRoom>;
    findAll(): Promise<ChatRoom[]>;
    findOne(id: string): Promise<ChatRoom>;
    update(id: string, updateChatRoomDto: UpdateChatDto): Promise<ChatRoom>;
    addMembers(id: string, updateMembersDto: UpdateMembersDto): Promise<ChatRoom>;
    removeMembers(id: string, updateMembersDto: UpdateMembersDto): Promise<ChatRoom>;
    getMessages(id: string): Promise<Message[]>;
    addMessage(id: string, createMessageDto: CreateMessageDto): Promise<Message>;
    delete(id: string): Promise<{
        readonly success: true;
    }>;
}
