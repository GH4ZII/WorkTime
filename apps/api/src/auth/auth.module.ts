import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Viktig å importere UsersModule
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UsersModule, // Gir tilgang til UsersService
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET, // VIKTIG: Hent fra .env-fil!
            signOptions: { expiresIn: '60m' }, // Token er gyldig i 60 minutter
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy], // Registrer strategien som en provider
})
export class AuthModule {}
