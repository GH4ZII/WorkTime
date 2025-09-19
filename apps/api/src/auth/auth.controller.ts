import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req) {
        console.log('AuthController: getProfile called, user:', req.user);
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
        const { currentPassword, newPassword } = changePasswordDto;
        const userId = req.user.id;
        
        await this.authService.changePassword(userId, currentPassword, newPassword);
        
        return { message: 'Passord endret vellykket' };
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        return await this.authService.requestPasswordReset(email);
    }

    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;
        return await this.authService.resetPassword(token, newPassword);
    }
}
