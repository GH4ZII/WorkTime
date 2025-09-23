import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RealtimeService } from './realtime.service';
export declare class RealtimeGateway implements OnGatewayInit {
    private readonly realtimeService;
    server: Server;
    constructor(realtimeService: RealtimeService);
    afterInit(): void;
    handleJoinUserRoom(client: any, userId: string): void;
}
