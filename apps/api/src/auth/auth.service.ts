import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(password, user.passwordHash))) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { 
            username: user.email, 
            sub: user.id, 
            name: user.name,
            role: user.role 
        };
        console.log('AuthService: Creating JWT payload:', payload);
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new Error('Bruker ikke funnet');
        }

        // Verifiser nåværende passord
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isCurrentPasswordValid) {
            throw new Error('Nåværende passord er feil');
        }

        // Hash nytt passord
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Oppdater passordet i databasen
        await this.usersService.updatePassword(userId, newPasswordHash);

        return true;
    }

    verifyToken(token: string) {
        return this.jwtService.verify(token);
    }
}
