import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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
}
