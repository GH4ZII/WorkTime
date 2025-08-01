import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { PrismaService } from "../prisma.service";

@Module({
    controllers: [ChatController],
    providers: [ChatService, ChatGateway, PrismaService],
    exports: [ChatService, ChatGateway],
})
export class ChatModule {}
