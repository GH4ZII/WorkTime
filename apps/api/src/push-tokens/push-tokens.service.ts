import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';

@Injectable()
export class PushTokensService {
  constructor(private prisma: PrismaService) {}

  /**
   * Registrerer en ny push token for en bruker
   */
  async registerToken(userId: string, createPushTokenDto: CreatePushTokenDto) {
    const { token, deviceId, platform } = createPushTokenDto;

    // Sjekk om token allerede eksisterer
    const existingToken = await this.prisma.pushToken.findUnique({
      where: { token },
    });

    if (existingToken) {
      // Oppdater eksisterende token hvis den tilhører samme bruker
      if (existingToken.userId === userId) {
        return this.prisma.pushToken.update({
          where: { id: existingToken.id },
          data: {
            deviceId,
            platform,
            isActive: true,
            updatedAt: new Date(),
          },
        });
      } else {
        // Token tilhører en annen bruker, deaktiver den gamle og opprett ny
        await this.prisma.pushToken.update({
          where: { id: existingToken.id },
          data: { isActive: false },
        });
      }
    }

    // Opprett ny token
    return this.prisma.pushToken.create({
      data: {
        userId,
        token,
        deviceId,
        platform,
        isActive: true,
      },
    });
  }

  /**
   * Henter alle aktive push tokens for en bruker
   */
  async getUserTokens(userId: string) {
    return this.prisma.pushToken.findMany({
      where: {
        userId,
        isActive: true,
      },
    });
  }

  /**
   * Henter alle aktive push tokens for flere brukere
   */
  async getUsersTokens(userIds: string[]) {
    return this.prisma.pushToken.findMany({
      where: {
        userId: { in: userIds },
        isActive: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Deaktiverer en push token
   */
  async deactivateToken(tokenId: string) {
    return this.prisma.pushToken.update({
      where: { id: tokenId },
      data: { isActive: false },
    });
  }

  /**
   * Deaktiverer alle tokens for en bruker
   */
  async deactivateUserTokens(userId: string) {
    return this.prisma.pushToken.updateMany({
      where: { userId },
      data: { isActive: false },
    });
  }

  /**
   * Sletter gamle inaktive tokens
   */
  async cleanupInactiveTokens() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.prisma.pushToken.deleteMany({
      where: {
        isActive: false,
        updatedAt: {
          lt: thirtyDaysAgo,
        },
      },
    });
  }
}
