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
        timeout: 300000, // 5 minutter timeout
      });
      this.logger.log(`🔧 [OPENAI] OpenAI klient initialisert med ${this.defaultOptions.retryAttempts} retries og 5min timeout`);
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
    const openaiCallStartTime = Date.now();
    
    try {
      this.logger.log(`🚀 [OPENAI] Starting OpenAI API call at ${new Date().toISOString()}`);
      
      const model = options.model || this.defaultOptions.model || 'gpt-5-mini';
      const maxTokens = options.maxTokens || this.defaultOptions.maxTokens || 4000;
      
      this.logger.log(`📝 [OPENAI] Using model: ${model}, maxTokens: ${maxTokens}`);
      this.logger.log(`📝 [OPENAI] Prompt size: ${prompt.length} characters`);
      this.logger.log(`📝 [OPENAI] Prompt preview: ${prompt.substring(0, 100)}...`);
      
      this.logger.log(`⏱️ [OPENAI] About to make API call...`);
      const apiCallStartTime = Date.now();
      
      // Legg til timeout og mer detaljert logging
      const completionPromise = this.openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: maxTokens,
        temperature: options.temperature || this.defaultOptions.temperature,
      });
      
      // Log progress hver 30 sekund
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - apiCallStartTime;
        this.logger.log(`⏳ [OPENAI] Still waiting... ${elapsed}ms elapsed (${(elapsed/1000).toFixed(1)}s)`);
      }, 30000);
      
      let completion;
      try {
        completion = await completionPromise;
        clearInterval(progressInterval);
        const apiCallEndTime = Date.now();
        
        this.logger.log(`⏱️ [OPENAI] API call completed in ${apiCallEndTime - apiCallStartTime}ms`);
      } catch (error) {
        clearInterval(progressInterval);
        throw error;
      }
      
      // ← Log hele OpenAI-responsen
      this.logger.log(`📄 [OPENAI] Raw response length: ${completion.choices[0].message.content?.length || 0} characters`);
      this.logger.log(`📊 [OPENAI] Token usage: ${completion.usage?.prompt_tokens || 0} prompt + ${completion.usage?.completion_tokens || 0} completion = ${completion.usage?.total_tokens || 0} total`);
      
      const response = {
        content: completion.choices[0].message.content || '',
        usage: { 
          promptTokens: completion.usage?.prompt_tokens || 0, 
          completionTokens: completion.usage?.completion_tokens || 0, 
          totalTokens: completion.usage?.total_tokens || 0 
        },
        model: completion.model,
      };
      
      const totalOpenaiTime = Date.now() - openaiCallStartTime;
      this.logger.log(`✅ [OPENAI] Total OpenAI processing time: ${totalOpenaiTime}ms`);
      this.logger.log(`📄 [OPENAI] Response content preview: ${response.content.substring(0, 200)}...`);
      
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
