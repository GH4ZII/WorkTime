import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
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
        // Returner brukerdata fra session hvis tilgjengelig
        if (req.user) {
            return req.user;
        }
        // Eller returner null hvis ikke innlogget
        return null;
    }
}
