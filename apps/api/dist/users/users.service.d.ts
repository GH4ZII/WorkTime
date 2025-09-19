import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@prisma/client";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        hireDate: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        hireDate: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        hireDate: Date;
    } | null>;
    update(id: string, data: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        hireDate: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        hireDate: Date;
    }>;
    findOneByEmail(email: string): Promise<User | null>;
    updatePassword(id: string, newPasswordHash: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        hireDate: Date;
    }>;
    savePasswordResetToken(id: string, token: string, expires: Date): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        hireDate: Date;
    }>;
    findByPasswordResetToken(token: string): Promise<User | null>;
    clearPasswordResetToken(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        hireDate: Date;
    }>;
}
