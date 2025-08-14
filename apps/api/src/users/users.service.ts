import { Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma.service"; // din Prisma-klient
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role, User } from "@prisma/client";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // 1) Lage ny bruker
    async create(data: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: await bcrypt.hash(data.password, 10),
                phone: data.phone,
                role: data.role as Role,
                hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
                // ← Kun stillingsprosent, ikke maks timer
                positionPercentage: data.positionPercentage || 100,
            },
        });
    }

    // 2) Hente alle brukere
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                hireDate: true,
                // ← Kun stillingsprosent, ikke maks timer
                positionPercentage: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    // 3) Hente en bruker på ID
    async findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    // 4) Endre en bruker
    async update(id: string, data: UpdateUserDto) {
        const updateData: any = { ...data };
        
        // ← Fikse hireDate format
        if (updateData.hireDate) {
            // Konverter til ISO-8601 format
            updateData.hireDate = new Date(updateData.hireDate).toISOString();
        }
        
        // ← Fjernet automatisk beregning av maks timer
        return this.prisma.user.update({
            where: { id },
            data: updateData
        });
    }

    // 5) Slette en bruker
    async remove(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    // 7) Oppdater passord
    async updatePassword(id: string, newPasswordHash: string) {
        return this.prisma.user.update({
            where: { id },
            data: {
                passwordHash: newPasswordHash,
            },
        });
    }
}
