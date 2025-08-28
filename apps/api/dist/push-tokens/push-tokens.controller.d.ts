import { PushTokensService } from './push-tokens.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';
export declare class PushTokensController {
    private readonly pushTokensService;
    constructor(pushTokensService: PushTokensService);
    registerToken(req: any, createPushTokenDto: CreatePushTokenDto): Promise<{
        token: string;
        deviceId: string | null;
        platform: import(".prisma/client").$Enums.Platform;
        id: string;
        userId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMyTokens(req: any): Promise<{
        token: string;
        deviceId: string | null;
        platform: import(".prisma/client").$Enums.Platform;
        id: string;
        userId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deactivateToken(req: any, tokenId: string): Promise<{
        token: string;
        deviceId: string | null;
        platform: import(".prisma/client").$Enums.Platform;
        id: string;
        userId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
