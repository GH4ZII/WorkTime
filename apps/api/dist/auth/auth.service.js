"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
let AuthService = class AuthService {
    usersService;
    jwtService;
    mailService;
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(password, user.passwordHash))) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
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
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new Error('Bruker ikke funnet');
        }
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isCurrentPasswordValid) {
            throw new Error('Nåværende passord er feil');
        }
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePassword(userId, newPasswordHash);
        return true;
    }
    verifyToken(token) {
        return this.jwtService.verify(token);
    }
    async requestPasswordReset(email) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            return { message: 'Hvis e-posten eksisterer, vil du motta en lenke for å tilbakestille passordet.' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000);
        await this.usersService.savePasswordResetToken(user.id, resetToken, resetTokenExpires);
        const resetUrl = `${process.env.FRONTEND_BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
        try {
            await this.mailService.sendPasswordResetEmail(user.email, user.name, resetUrl);
            console.log(`Password reset email sent to ${email}`);
        }
        catch (error) {
            console.error('Failed to send password reset email:', error);
        }
        return {
            message: 'Hvis e-posten eksisterer, vil du motta en lenke for å tilbakestille passordet.'
        };
    }
    async resetPassword(token, newPassword) {
        const user = await this.usersService.findByPasswordResetToken(token);
        if (!user || !user.passwordResetToken || !user.passwordResetExpires) {
            throw new Error('Ugyldig eller utløpt reset token');
        }
        if (user.passwordResetExpires < new Date()) {
            throw new Error('Reset token har utløpt');
        }
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePassword(user.id, newPasswordHash);
        await this.usersService.clearPasswordResetToken(user.id);
        return { message: 'Passordet har blitt tilbakestilt vellykket' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map