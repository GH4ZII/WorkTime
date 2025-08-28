import { Controller, Post, Body, UseGuards, Request, Get, Delete, Param } from '@nestjs/common';
import { PushTokensService } from './push-tokens.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('push-tokens')
@UseGuards(JwtAuthGuard)
export class PushTokensController {
  constructor(private readonly pushTokensService: PushTokensService) {}

  @Post()
  async registerToken(@Request() req, @Body() createPushTokenDto: CreatePushTokenDto) {
    const userId = req.user.id;
    return this.pushTokensService.registerToken(userId, createPushTokenDto);
  }

  @Get('my-tokens')
  async getMyTokens(@Request() req) {
    const userId = req.user.id;
    return this.pushTokensService.getUserTokens(userId);
  }

  @Delete(':id')
  async deactivateToken(@Request() req, @Param('id') tokenId: string) {
    const userId = req.user.id;
    // Sjekk at token tilhører brukeren
    const token = await this.pushTokensService.getUserTokens(userId);
    const userToken = token.find(t => t.id === tokenId);
    
    if (!userToken) {
      throw new Error('Token not found or access denied');
    }
    
    return this.pushTokensService.deactivateToken(tokenId);
  }
}
