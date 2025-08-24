import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateShiftSwapRequestDto } from './dto/create-shiftswap-request.dto';
import { SwapRequestType } from '@prisma/client';
import {UpdateShiftSwapRequestDto} from "./dto/update-shiftswap-request.dto";
import { RequestStatus } from 'generated/prisma';

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
        
        // For GIVE_AWAY må swapWithId også oppgis
        if (dto.type === SwapRequestType.GIVE_AWAY) {
            if (!dto.swapWithId) {
                throw new BadRequestException(
                    'Ved GIVE_AWAY må swapWithId oppgis (hvem vakten skal gis til).',
                );
            }
        }

        const data: any = {
            requestedById: dto.userId,
            fromShiftId: dto.fromShiftId,
            swapType: dto.type,
            reason: dto.reason ?? null,
        };

        // Lagre swapWithId for både SWAP og GIVE_AWAY
        if (dto.swapWithId) {
            data.swapWithId = dto.swapWithId;
        }

        // Bare lagre toShiftId for SWAP
        if (dto.type === SwapRequestType.SWAP && dto.toShiftId) {
            data.toShiftId = dto.toShiftId;
        }

        return this.prisma.shiftSwapRequest.create({ data });
    }

    async findAll() {
        return this.prisma.shiftSwapRequest.findMany({
            where: { isHidden: false }
        });
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

        // Bruk hide i stedet for delete
        return this.prisma.shiftSwapRequest.update({
            where: { id },
            data: { isHidden: true }
        });
    }

    async approve(id: string) {
        const request = await this.findOne(id);
        
        if (!request) {
            throw new NotFoundException('Forespørsel ikke funnet');
        }

        if (request.status !== RequestStatus.PENDING) {
            throw new BadRequestException('Forespørsel er allerede behandlet');
        }

        return this.prisma.shiftSwapRequest.update({
            where: { id },
            data: { status: RequestStatus.APPROVED }
        });
    }

    async reject(id: string) {
        const request = await this.findOne(id);
        
        if (!request) {
            throw new NotFoundException('Forespørsel ikke funnet');
        }

        if (request.status !== RequestStatus.PENDING) {
            throw new BadRequestException('Forespørsel er allerede behandlet');
        }

        return this.prisma.shiftSwapRequest.update({
            where: { id },
            data: { status: RequestStatus.REJECTED }
        });
    }

    async hide(id: string) {
        const request = await this.findOne(id);
        
        if (!request) {
            throw new NotFoundException('Forespørsel ikke funnet');
        }

        return this.prisma.shiftSwapRequest.update({
            where: { id },
            data: { isHidden: true }
        });
    }
}
