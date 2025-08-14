import { Injectable } from '@nestjs/common';
import { ChatGPTService } from './services/chatgpt.service';
import { PromptBuilder } from './services/prompt-builder.service';

@Injectable()
export class AiService {
  constructor(
    private readonly chatGPTService: ChatGPTService,
    private readonly promptBuilder: PromptBuilder,
  ) {}

  async generateMonthlySchedule(month: string) {
    // Implementer hovedlogikken her
    return this.chatGPTService.generateSchedule('Test prompt');
  }
}
