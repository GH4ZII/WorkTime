import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface ChatGPTOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  retryAttempts?: number;
}

export interface ChatGPTPrompt {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatGPTResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

@Injectable()
export class ChatGPTService {
  private readonly logger = new Logger(ChatGPTService.name);
  private readonly configService: ConfigService;
  private openai: OpenAI;
  
  private readonly defaultOptions: ChatGPTOptions = {
    model: 'gpt-5-mini',
    maxTokens: 32000,
    temperature: 0.7,
    retryAttempts: 3,
  };

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.initializeOpenAI();
  }

  /**
   * Initialiserer OpenAI klienten
   */
  private initializeOpenAI(): void {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY ikke satt. AI-funksjonalitet vil ikke fungere.');
      return;
    }

    try {
      this.openai = new OpenAI({
        apiKey: apiKey,
        maxRetries: this.defaultOptions.retryAttempts,
      });
      this.logger.log('OpenAI klient initialisert');
    } catch (error) {
      this.logger.error('Feil ved initialisering av OpenAI klient:', error);
    }
  }

  /**
   * Genererer en skiftplan ved hjelp av ChatGPT
   */
  async generateSchedule(prompt: string, options?: ChatGPTOptions): Promise<ChatGPTResponse> {
    const finalOptions = { ...this.defaultOptions, ...options };
    
    try {
      // Sjekk om OpenAI er tilgjengelig
      if (!this.isOpenAIAvailable()) {
        throw new Error('OpenAI API ikke tilgjengelig. Sjekk konfigurasjon.');
      }

      this.logger.log(`Genererer skiftplan med modell: ${finalOptions.model}`);
      
      // Bruk ekte OpenAI API
      return await this.callOpenAI(prompt, finalOptions);
      
    } catch (error) {
      this.logger.error('Feil ved generering av skiftplan:', error);
      throw new Error(`Kunne ikke generere skiftplan: ${error.message}`);
    }
  }

  /**
   * Sjekker om OpenAI API er tilgjengelig
   */
  private isOpenAIAvailable(): boolean {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    return !!apiKey && !!this.openai;
  }

  private async callOpenAI(prompt: string, options: ChatGPTOptions): Promise<ChatGPTResponse> {
    try {
      this.logger.log('Starter OpenAI API-kall...');
      
      const model = options.model || this.defaultOptions.model || 'gpt-5-mini';
      const maxTokens = options.maxTokens || this.defaultOptions.maxTokens || 4000;
      
      this.logger.log(`Bruker modell: ${model}, maxTokens: ${maxTokens}`);
      
      // ← Legg til mer detaljert logging
      this.logger.log('Prompt preview:', prompt.substring(0, 100) + '...');
      
      const completion = await this.openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: maxTokens,
      });
      
      // ← Log hele OpenAI-responsen
      this.logger.log('OpenAI raw response:', JSON.stringify(completion, null, 2));
      
      const response = {
        content: completion.choices[0].message.content || '',
        usage: { 
          promptTokens: completion.usage?.prompt_tokens || 0, 
          completionTokens: completion.usage?.completion_tokens || 0, 
          totalTokens: completion.usage?.total_tokens || 0 
        },
        model: completion.model,
      };
      
      this.logger.log('Processed response:', JSON.stringify(response, null, 2));
      
      return response;
      
    } catch (error) {
      this.logger.error('OpenAI API feil:', error);
      throw new Error(`OpenAI API feil: ${error.message}`);
    }
  }

  /**
   * Validerer at en prompt ikke er for lang
   */
  validatePrompt(prompt: string): boolean {
    const maxTokens = this.defaultOptions.maxTokens || 2000;
    const estimatedTokens = Math.ceil(prompt.length / 4);
    
    if (estimatedTokens > maxTokens) {
      this.logger.warn(`Prompt for lang: ${estimatedTokens} tokens (maks: ${maxTokens})`);
      return false;
    }
    
    return true;
  }

  /**
   * Henter brukestatistikk (for monitoring)
   */
  getUsageStats(): { totalCalls: number; totalTokens: number } {
    return {
      totalCalls: 0,
      totalTokens: 0
    };
  }

  /**
   * Test-metode for å verifisere at tjenesten fungerer
   */
  async testConnection(): Promise<boolean> {
    try {
      const testPrompt = 'Test prompt for å verifisere OpenAI tilkobling';
      const response = await this.generateSchedule(testPrompt);
      
      // Legg til logging her
      this.logger.log(`Test response: ${JSON.stringify(response)}`);
      
      return !!response.content; // Dette returnerer false hvis content er tom
    } catch (error) {
      this.logger.error('Test av OpenAI tilkobling feilet:', error);
      return false;
    }
  }
}
