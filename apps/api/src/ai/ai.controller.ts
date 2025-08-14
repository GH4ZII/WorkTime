import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatGPTService } from './services/chatgpt.service';
import { PromptBuilder } from './services/prompt-builder.service';
import { UsersService } from '../users/users.service';
import { TimeOffReqService } from '../timeOffReq/timeOffReq.service';
import { ShiftsService } from '../shifts/shifts.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly chatGPTService: ChatGPTService,
    private readonly promptBuilder: PromptBuilder,
    private readonly usersService: UsersService,
    private readonly shiftsService: ShiftsService,
    private readonly timeOffReqService: TimeOffReqService, // ← Sjekk at denne er importert
  ) {}

  // Test OpenAI tilkobling
  @Get('test-connection')
  async testConnection() {
    try {
      const isConnected = await this.chatGPTService.testConnection();
      
      return {
        success: true,
        connected: isConnected,
        message: isConnected ? 'OpenAI tilkobling OK' : 'OpenAI tilkobling feilet',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        connected: false,
        message: 'Test av tilkobling feilet',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // ← Oppdater denne metoden med test-data
  @Post('generate-monthly-schedule')
  async generateMonthlySchedule(@Body() body: { month: string }) {
    try {
        const month = new Date(body.month);
        const dbEmployees = await this.usersService.findAll();
        const dbTimeOffRequests = await this.timeOffReqService.findAll();

        const employees = dbEmployees.map(emp => ({
            id: emp.id, name: emp.name, role: emp.role, preferredShifts: [], positionPercentage: emp.positionPercentage || 100
        }));
        const timeOffRequests = dbTimeOffRequests.map(req => ({
            employeeId: req.userId, startDate: req.fromDate, endDate: req.toDate,
            type: this.convertTimeOffType(req.type), status: this.convertRequestStatus(req.status)
        }));

        const prompt = this.promptBuilder.buildMonthlySchedulePrompt(employees, timeOffRequests, month, []);
        const aiResponse = await this.chatGPTService.generateSchedule(prompt);

        if (!aiResponse.content || aiResponse.content.trim() === '') {
            return { success: false, message: 'AI returnerte tomt svar' };
        }

        let schedule;
        let cleanedContent = ''; // ← Ny: Initialiser med tom streng
        try {
            let content = aiResponse.content;
            
            // ← Ny: Fjern markdown
            if (content.includes('```json')) {
                content = content.replace(/```json\n?/, '').replace(/\n?```$/, '');
            }
            
            // ← Ny: Fjern alle kommentarer (// ...)
            content = content.replace(/\/\/.*$/gm, '');
            
            // ← Ny: Fjern kommentarer på slutten av linjer
            content = content.replace(/\/\/.*?(?=\n|$)/g, '');
            
            // ← Ny: Fjern tomme linjer
            content = content.replace(/^\s*[\r\n]/gm, '');
            
            // ← Ny: Fjern kommentarer i JSON (// ... (same structure repeated...))
            content = content.replace(/,\s*\/\/.*?(?=\n|,|$)/g, '');
            
            // ← Ny: Lagre renset innhold
            cleanedContent = content;
            
            // ← Ny: Log renset innhold for debugging
            console.log('Renset AI-innhold (første 500 tegn):', cleanedContent.substring(0, 500) + '...');
            
            schedule = JSON.parse(cleanedContent);
        } catch (parseError) {
            console.error('Feil ved JSON parsing etter rensing:', parseError);
            console.error('Renset innhold (første 1000 tegn):', cleanedContent.substring(0, 1000) + '...');
            return { 
                success: false, 
                message: 'AI returnerte ugyldig JSON-format. Prøv igjen.',
                error: parseError.message,
                rawContent: cleanedContent.substring(0, 500) + '...'
            };
        }
        
        return { 
            success: true, 
            message: `Skiftplan generert med AI for ${employees.length} ansatte`, 
            shifts: schedule.shifts || [], 
            summary: schedule.summary || {}, 
            month: month.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' }), 
            employeeCount: employees.length 
        };
    } catch (error) {
        console.error('Feil ved AI-generering:', error);
        return { 
            success: false, 
            message: 'Feil ved AI-generering', 
            error: error.message 
        };
    }
}

  // Bruk generert skiftplan
  @Post('apply-schedule')
  async applySchedule(@Body() body: { shifts: any[], month: string, approved: boolean }) {
    try {
      if (!body.approved) {
        return {
          success: false,
          message: 'Skiftplan ikke godkjent'
        };
      }
      
      // ← Legg til logging for å se hvilke ID-er AI-en bruker
      console.log('AI-genererte skift:', JSON.stringify(body.shifts, null, 2));
      
      const createdShifts: any[] = []; // ← Fikse array type
      for (const aiShift of body.shifts) {
        try {
          // ← Logg hver employeeId
          console.log(`Prøver å opprette skift for employeeId: ${aiShift.employeeId}`);
          
          const shiftData = { 
            userId: aiShift.employeeId, 
            startTime: new Date(`${aiShift.date}T${aiShift.startTime}:00.000Z`).toISOString(), // ← Komplett ISO format
            endTime: new Date(`${aiShift.date}T${aiShift.endTime}:00.000Z`).toISOString(),     // ← Komplett ISO format
            notes: `AI-generert: ${aiShift.shiftType}`,
            createdBy: 'AI'
          };
          
          const createdShift = await this.shiftsService.create(shiftData);
          createdShifts.push(createdShift);
        } catch (shiftError) { 
          console.error(`Feil ved opprettelse av skift for ${aiShift.employeeId}:`, shiftError); 
        }
      }
      
      return {
        success: true,
        message: `Skiftplan godkjent og ${createdShifts.length} skift opprettet`,
        createdShifts: createdShifts.length,
        month: body.month
      };
      
    } catch (error) {
      console.error('Feil ved godkjenning av skiftplan:', error);
      return {
        success: false,
        message: `Feil: ${error.message}`,
        createdShifts: 0
      };
    }
  }

  // Hjelpefunksjoner
  private async getEmployees() {
    // Implementer henting av ansatte fra database
    return [];
  }

  private async getTimeOffRequests(month: string) {
    // Implementer henting av fravær fra database
    return [];
  }

  private parseScheduleResponse(content: string) {
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error('Kunne ikke parse AI-respons');
    }
  }

  // ← Hjelpemetoder for å konvertere enums
  private convertTimeOffType(dbType: any): 'VACATION' | 'SICK_LEAVE' | 'PERSONAL_LEAVE' | 'MATERNITY_LEAVE' {
    const typeMap: Record<string, 'VACATION' | 'SICK_LEAVE' | 'PERSONAL_LEAVE' | 'MATERNITY_LEAVE'> = {
      'VACATION': 'VACATION',
      'SICK': 'SICK_LEAVE',        // ← Database bruker 'SICK', AI forventer 'SICK_LEAVE'
      'PERSONAL': 'PERSONAL_LEAVE', // ← Database bruker 'PERSONAL', AI forventer 'PERSONAL_LEAVE'
      'MATERNITY': 'MATERNITY_LEAVE' // ← Database bruker 'MATERNITY', AI forventer 'MATERNITY_LEAVE'
    };
    return typeMap[dbType] || 'PERSONAL_LEAVE';
  }

  private convertRequestStatus(dbStatus: any): 'APPROVED' | 'PENDING' | 'REJECTED' {
    const statusMap: Record<string, 'APPROVED' | 'PENDING' | 'REJECTED'> = {
      'APPROVED': 'APPROVED',
      'PENDING': 'PENDING',
      'REJECTED': 'REJECTED'
    };
    return statusMap[dbStatus] || 'PENDING';
  }

  // ← Hjelpemetode for å mappe skift-typer
  private mapShiftType(aiShiftType: string): string {
    const shiftTypeMap: Record<string, string> = {
      'Morgenskift': 'MORNING',
      'Dagsift': 'DAY',
      'Ettermiddagsskift': 'EVENING',
      'Nattskift': 'NIGHT'
    };
    
    return shiftTypeMap[aiShiftType] || 'DAY';
  }
}
