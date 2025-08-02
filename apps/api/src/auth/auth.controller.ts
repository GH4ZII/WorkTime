import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('me')
    async getProfile(@Request() req) {
        // Sjekk om bruker er i session (fra cookie)
        if (req.user) {
            return req.user;
        }
        
        // Sjekk om vi har en auth_token cookie
        const authToken = req.cookies?.auth_token;
        if (authToken) {
            try {
                // Dekode JWT-token for å få brukerdata
                const decoded = this.authService.verifyToken(authToken);
                return decoded;
            } catch (error) {
                console.error('Invalid token:', error);
                return null;
            }
        }
        
        return null;
    }
}
