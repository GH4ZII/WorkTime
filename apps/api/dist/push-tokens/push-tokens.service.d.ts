import { PrismaService } from '../prisma.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';
export declare class PushTokensService {
    private prisma;
    constructor(prisma: PrismaService);
    registerToken(userId: string, createPushTokenDto: CreatePushTokenDto): Promise<{
        token: string;
        deviceId: string | null;
        platform: import(".prisma/client").$Enums.Platform;
        id: string;
        userId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserTokens(userId: string): Promise<{
        token: string;
        deviceId: string | null;
        platform: import(".prisma/client").$Enums.Platform;
        id: string;
        userId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUsersTokens(userIds: string[]): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        token: string;
        deviceId: string | null;
        platform: import(".prisma/client").$Enums.Platform;
        id: string;
        userId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    deactivateToken(tokenId: string): Promise<{
        token: string;
        deviceId: string | null;
        platform: import(".prisma/client").$Enums.Platform;
        id: string;
        userId: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deactivateUserTokens(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    cleanupInactiveTokens(): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
