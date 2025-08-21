import { Injectable, Logger } from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';
import { PromptBuilder, Employee, TimeOffRequest } from './prompt-builder';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly chatGPTService: ChatGPTService,
    private readonly promptBuilder: PromptBuilder,
  ) {}

  private getMonthNumber(month: string): number {
    const months = [
      'januar', 'februar', 'mars', 'april', 'mai', 'juni',
      'juli', 'august', 'september', 'oktober', 'november', 'desember'
    ];
    const monthIndex = months.findIndex(m => m.toLowerCase() === month.toLowerCase());
    return monthIndex >= 0 ? monthIndex : 0; // Default to January if month not found
  }

  private cleanJsonString(jsonString: string): string {
    // Fix common JSON syntax errors from AI responses
    return jsonString
      // Replace single quotes with double quotes for property names
      .replace(/'([^']+)':/g, '"$1":')
      // Fix missing quotes around property names
      .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
      // Remove trailing commas before closing brackets/braces
      .replace(/,(\s*[}\]])/g, '$1')
      // Fix common AI formatting issues
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }

  async generateMonthlySchedule(
    month: string,
    year: number,
    employees: Employee[],
    timeOffRequests: TimeOffRequest[],
  ): Promise<any> {
    this.logger.log(`Generating shift plan for ${month} ${year} with ${employees.length} employees`);

    // Convert month string and year to Date object
    const monthDate = new Date(year, this.getMonthNumber(month), 1);
    
    const prompt = this.promptBuilder.buildMonthlySchedulePrompt(
      employees,
      timeOffRequests,
      monthDate,
      [], // Empty constraints array for now
    );

    let lastError: Error | null = null;
    
    // Try up to 3 times
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        this.logger.log(`Attempt ${attempt} of 3`);
        
        const response = await this.chatGPTService.generateSchedule(prompt);
        
        if (response && response.content) {
          // Try to parse JSON from response
          try {
            const jsonMatch = response.content.match(/```json\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
              const jsonContent = jsonMatch[1].trim();
              const cleanedJson = this.cleanJsonString(jsonContent);
              const schedule = JSON.parse(cleanedJson);
              this.logger.log(`Shift plan generated on attempt ${attempt}`);
              return schedule;
            } else {
              // Try to parse entire response as JSON
              const cleanedJson = this.cleanJsonString(response.content);
              const schedule = JSON.parse(cleanedJson);
              this.logger.log(`Shift plan generated on attempt ${attempt}`);
              return schedule;
            }
          } catch (parseError) {
            this.logger.warn(`Attempt ${attempt} failed: Invalid JSON from AI: ${parseError.message}`);
            lastError = parseError;
            continue;
          }
        } else {
          this.logger.warn(`Attempt ${attempt} failed: Empty response from AI`);
          lastError = new Error('Empty response from AI');
          continue;
        }
      } catch (error) {
        this.logger.warn(`Attempt ${attempt} failed: ${error.message}`);
        lastError = error;
        continue;
      }
    }

    this.logger.error(`Could not generate valid shift plan after 3 attempts. Last error: ${lastError?.message || 'Unknown error'}`);
    throw new Error(`Could not generate valid shift plan after 3 attempts. Last error: ${lastError?.message || 'Unknown error'}`);
  }
}
