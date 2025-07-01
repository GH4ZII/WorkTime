import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service"; // din Prisma-klient
import { CreateTimeOffRequestDto} from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";

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

}



