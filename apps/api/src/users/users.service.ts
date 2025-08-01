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
        const hash = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                passwordHash: hash, // Hash passordet før lagring
                role: data.role as Role, // Brukerens rolle
                hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
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
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
    }

    // 3) Hente en bruker på ID
    async findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    // 4) Endre en bruker
    async update(id: string, data: UpdateUserDto) {
        const updateData: any = { ...data };

        // Hvis role er satt, pakk det i { set: ... }
        if (updateData.role) {
            updateData.role = { set: updateData.role as Role };
        }

        return this.prisma.user.update({
            where: { id },
            data: updateData,
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
}
