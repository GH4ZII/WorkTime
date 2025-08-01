import { PrismaService } from '../prisma.service';
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateChatDto): Promise<{
        members: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            joinedAt: Date;
            roomId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        messages: {
            id: string;
            sentAt: Date;
            roomId: string;
            senderId: string;
            content: string;
        }[];
        members: {
            id: string;
            userId: string;
            joinedAt: Date;
            roomId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
    })[]>;
    findOne(id: string): Promise<{
        members: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            joinedAt: Date;
            roomId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
    }>;
    update(id: string, dto: UpdateChatDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
    }>;
    addMembers(roomId: string, userIds: string[]): Promise<{
        members: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            joinedAt: Date;
            roomId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
    }>;
    removeMembers(roomId: string, userIds: string[]): Promise<{
        members: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            joinedAt: Date;
            roomId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
    }>;
    getMessages(roomId: string): import(".prisma/client").Prisma.PrismaPromise<({
        sender: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        sentAt: Date;
        roomId: string;
        senderId: string;
        content: string;
    })[]>;
    addMessage(roomId: string, dto: CreateMessageDto): Promise<{
        id: string;
        sentAt: Date;
        roomId: string;
        senderId: string;
        content: string;
    }>;
}
