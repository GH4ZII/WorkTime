import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean>;
    verifyToken(token: string): any;
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
