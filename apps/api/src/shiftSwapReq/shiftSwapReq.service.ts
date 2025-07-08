import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateShiftSwapRequestDto } from './dto/create-shiftswap-request.dto';
import { SwapRequestType } from '@prisma/client';
import {UpdateShiftSwapRequestDto} from "./dto/update-shiftswap-request.dto";

@Injectable()
export class ShiftSwapReqService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateShiftSwapRequestDto) {
        if (dto.type === SwapRequestType.SWAP) {
            if (!dto.swapWithId || !dto.toShiftId) {
                throw new BadRequestException(
                    'Ved SWAP må swapWithId og toShiftId oppgis.',
                );
            }
        }
        const data: any = {
            requestedById: dto.userId,
            fromShiftId: dto.fromShiftId,
            swapType: dto.type,
            reason: dto.reason ?? null,
        };

        if (dto.type === SwapRequestType.SWAP) {
            data.swapWithId = dto.swapWithId;
            data.toShiftId  = dto.toShiftId;
        }

        return this.prisma.shiftSwapRequest.create({ data });
    }

    async findAll() {
        return this.prisma.shiftSwapRequest.findMany();
    }

    async findOne(id: string) {
        return this.prisma.shiftSwapRequest.findUnique({
            where: { id },
        });
    }

    async update(id: string, dto: UpdateShiftSwapRequestDto) {
        // Sjekk at forespørselen finnes
        await this.findOne(id);

        // Bare de feltene som DTO-en kan inneholde:
        const data: Record<string, any> = {};

        if (dto.status) {
            data.status = dto.status;
        }
        if (dto.swapWithId !== undefined) {
            data.swapWithId = dto.swapWithId;
        }
        if (dto.toShiftId !== undefined) {
            data.toShiftId = dto.toShiftId;
        }
        if (dto.reason !== undefined) {
            data.reason = dto.reason;
        }

        return this.prisma.shiftSwapRequest.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        // Sjekk at forespørselen finnes
        await this.findOne(id);

        return this.prisma.shiftSwapRequest.delete({
            where: { id },
        });
    }
}
