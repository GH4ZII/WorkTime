import { PrismaService } from '../prisma.service';
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Prisma } from '@prisma/client';
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
            joinedAt: Date;
            userId: string;
            roomId: string;
        })[];
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
    }>;
    findAll(): Prisma.PrismaPromise<({
        members: {
            id: string;
            joinedAt: Date;
            userId: string;
            roomId: string;
        }[];
        messages: {
            id: string;
            roomId: string;
            sentAt: Date;
            senderId: string;
            content: string;
        }[];
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        members: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            joinedAt: Date;
            userId: string;
            roomId: string;
        })[];
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateChatDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
    }>;
    addMembers(roomId: string, userIds: string[]): Promise<{
        members: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            joinedAt: Date;
            userId: string;
            roomId: string;
        })[];
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
    }>;
    removeMembers(roomId: string, userIds: string[]): Promise<{
        members: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            joinedAt: Date;
            userId: string;
            roomId: string;
        })[];
    } & {
        id: string;
        name: string | null;
        createdAt: Date;
    }>;
    getMessages(roomId: string): Prisma.PrismaPromise<({
        sender: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        roomId: string;
        sentAt: Date;
        senderId: string;
        content: string;
    })[]>;
    addMessage(roomId: string, dto: CreateMessageDto): Promise<{
        id: string;
        roomId: string;
        sentAt: Date;
        senderId: string;
        content: string;
    }>;
}
