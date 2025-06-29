// apps/api/src/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    async onModuleInit() {
        // Koble til databasen når NestJS-modulen starter
        await this.$connect();
    }

    async onModuleDestroy() {
        // Lukke forbindelsen når NestJS-modulen stenger
        await this.$disconnect();
    }
}
