import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatRoom, Message } from '@prisma/client';


@Controller('chatrooms')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    create(@Body() createChatRoomDto: CreateChatDto): Promise<ChatRoom> {
        return this.chatService.create(createChatRoomDto);
    }

    @Get()
    findAll(): Promise<ChatRoom[]> {
        return this.chatService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<ChatRoom> {
        return this.chatService.findOne(id);
    }

    // PATCH brukes for delvise oppdateringer, som å kun endre navnet.
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateChatRoomDto: UpdateChatDto,
    ): Promise<ChatRoom> {
        return this.chatService.update(id, updateChatRoomDto);
    }

    // --- Medlemshåndtering ---

    @Post(':id/members')
    addMembers(
        @Param('id') id: string,
        @Body() updateMembersDto: UpdateMembersDto,
    ): Promise<ChatRoom> {
        return this.chatService.addMembers(id, updateMembersDto.userIds);
    }

    // DELETE er det korrekte verbet for å fjerne en sub-ressurs.
    @Delete(':id/members')
    removeMembers(
        @Param('id') id: string,
        @Body() updateMembersDto: UpdateMembersDto,
    ): Promise<ChatRoom> {
        return this.chatService.removeMembers(id, updateMembersDto.userIds);
    }

    // --- Meldingshåndtering ---

    @Get(':id/messages')
    getMessages(@Param('id') id: string): Promise<Message[]> {
        return this.chatService.getMessages(id);
    }

    @Post(':id/messages')
    addMessage(
        @Param('id') id: string,
        @Body() createMessageDto: CreateMessageDto,
    ): Promise<Message> {
        return this.chatService.addMessage(id, createMessageDto);
    }
}
