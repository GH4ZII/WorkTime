import {Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import {PrismaService} from "../prisma.service"; // din Prisma-klient
import { CreateTimeOffRequestDto} from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";
import { RequestStatus } from "generated/prisma";

@Injectable()
export class TimeOffReqService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateTimeOffRequestDto) {
        return this.prisma.timeOffRequest.create({
            data: {
                userId: data.userId,
                fromDate: new Date(data.fromDate),
                toDate: new Date(data.toDate),
                type: data.type,
                reason: data.reason,
            },
        });
    }

    async findAll() {
        return this.prisma.timeOffRequest.findMany();
    }

    async findOne(id: string) {
        return this.prisma.timeOffRequest.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateTimeOffRequestDto) {
        return this.prisma.timeOffRequest.update({
            where: { id },
            data: {
                userId: data.userId,
                fromDate: data.fromDate ? new Date(data.fromDate) : undefined,
                toDate: data.toDate ? new Date(data.toDate) : undefined,
                type: data.type,
                reason: data.reason,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.timeOffRequest.delete({
            where: { id },
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

        return this.prisma.timeOffRequest.update({
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

        return this.prisma.timeOffRequest.update({
            where: { id },
            data: { status: RequestStatus.REJECTED }
        });
    }
}



