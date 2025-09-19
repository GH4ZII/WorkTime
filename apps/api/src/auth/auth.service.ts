import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

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

    async requestPasswordReset(email: string): Promise<{ message: string; token?: string }> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            // For sikkerhet: ikke avslør om e-posten eksisterer
            return { message: 'Hvis e-posten eksisterer, vil du motta en lenke for å tilbakestille passordet.' };
        }

        // Generer en sikker reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // 1 time fra nå

        // Lagre token i databasen (du må implementere denne metoden i UsersService)
        await this.usersService.savePasswordResetToken(user.id, resetToken, resetTokenExpires);

        // I produksjon: Send e-post med reset link
        // For nå returnerer vi token for testing
        console.log(`Password reset token for ${email}: ${resetToken}`);
        
        return { 
            message: 'Hvis e-posten eksisterer, vil du motta en lenke for å tilbakestille passordet.',
            token: resetToken // Kun for testing - fjern i produksjon
        };
    }

    async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
        // Finn bruker med gyldig token
        const user = await this.usersService.findByPasswordResetToken(token);
        if (!user || !user.passwordResetToken || !user.passwordResetExpires) {
            throw new Error('Ugyldig eller utløpt reset token');
        }

        // Sjekk om token er utløpt
        if (user.passwordResetExpires < new Date()) {
            throw new Error('Reset token har utløpt');
        }

        // Hash nytt passord
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Oppdater passord og fjern reset token
        await this.usersService.updatePassword(user.id, newPasswordHash);
        await this.usersService.clearPasswordResetToken(user.id);

        return { message: 'Passordet har blitt tilbakestilt vellykket' };
    }
}
