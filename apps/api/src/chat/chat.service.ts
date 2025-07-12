import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Sørg for at stien er korrekt
import { CreateChatDto} from "./dto/create-chat.dto";
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    /**
     * Creates a new chat room and optionally adds initial members.
     */
    async create(dto: CreateChatDto) {
        const { name, memberIds } = dto;
        return this.prisma.chatRoom.create({
            data: {
                name: name,
                // Opprett ChatMember-innslag for hver medsendt bruker-ID
                members: {
                    create: memberIds?.map(userId => ({
                        user: {
                            connect: { id: userId },
                        },
                    })),
                },
            },
            include: {
                members: { include: { user: { select: { id: true, name: true } } } },
            },
        });
    }

    /**
     * Finds all chat rooms.
     */
    findAll() {
        return this.prisma.chatRoom.findMany({
            include: {
                members: true,
                messages: {
                    orderBy: { sentAt: 'desc' },
                    take: 1, // Hent bare siste melding for forhåndsvisning
                },
            },
        });
    }

    /**
     * Finds a single chat room by its ID.
     */
    async findOne(id: string) {
        const room = await this.prisma.chatRoom.findUnique({
            where: { id },
            include: {
                members: { include: { user: { select: { id: true, name: true } } } },
            },
        });

        if (!room) {
            throw new NotFoundException(`Chatterom med ID ${id} ble ikke funnet.`);
        }
        return room;
    }

    /**
     * Updates the name of a chat room.
     */
    async update(id: string, dto: UpdateChatDto) {
        return this.prisma.chatRoom.update({
            where: { id },
            data: {
                name: dto.name,
            },
        });
    }

    /**
     * Adds an array of users to a chat room.
     */
    async addMembers(roomId: string, userIds: string[]) {
        // Oppretter nye ChatMember-innslag som kobler brukere til rommet
        await this.prisma.chatMember.createMany({
            data: userIds.map(userId => ({
                roomId,
                userId,
            })),
            skipDuplicates: true, // Forhindrer feil hvis en bruker allerede er medlem
        });
        return this.findOne(roomId); // Returner det oppdaterte rommet
    }

    /**
     * Removes an array of users from a chat room.
     */
    async removeMembers(roomId: string, userIds: string[]) {
        // Sletter ChatMember-innslag basert på rom- og bruker-ID
        await this.prisma.chatMember.deleteMany({
            where: {
                roomId: roomId,
                userId: { in: userIds },
            },
        });
        return this.findOne(roomId);
    }

    /**
     * Retrieves all messages from a specific chat room.
     */
    getMessages(roomId: string) {
        return this.prisma.message.findMany({
            where: { roomId },
            orderBy: { sentAt: 'asc' },
            include: {
                sender: { select: { id: true, name: true } }, // Inkluder info om avsender
            },
        });
    }

    /**
     * Adds a new message to a chat room.
     */
    async addMessage(roomId: string, dto: CreateMessageDto) {
        return this.prisma.message.create({
            data: {
                content: dto.content,
                roomId: roomId,
                senderId: dto.senderId,
            },
        });
    }
}
