import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
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
    private readonly timeOffReqService: TimeOffReqService,
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

  // Endre fra månedlig til ukentlig generering
  @Post('generate-weekly-schedule')
  async generateWeeklySchedule(@Body() body: { weekStart: string }) {
    try {
      const weekStart = new Date(body.weekStart);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // 7 dager (ukedag + 6 dager)
      
      const dbEmployees = await this.usersService.findAll();
      const dbTimeOffRequests = await this.timeOffReqService.findAll();

      const employees = dbEmployees.map(emp => ({
        id: emp.id, 
        name: emp.name, 
        role: emp.role, 
        preferredShifts: [], 
        positionPercentage: 100
      }));
      
      const timeOffRequests = dbTimeOffRequests.map(req => ({
        employeeId: req.userId, 
        startDate: req.fromDate, 
        endDate: req.toDate,
        type: this.convertTimeOffType(req.type), 
        status: this.convertRequestStatus(req.status)
      }));

      // Bruk prompt-builder for uke i stedet for måned
      const prompt = this.promptBuilder.buildWeeklySchedulePrompt(
        employees, 
        timeOffRequests, 
        weekStart, 
        weekEnd
      );
      
      const aiResponse = await this.chatGPTService.generateSchedule(prompt);

      if (!aiResponse.content || aiResponse.content.trim() === '') {
        return { success: false, message: 'AI returnerte tomt svar' };
      }

      let schedule;
      let cleanedContent = '';
      try {
        let content = aiResponse.content;
        
        // Fjern markdown og kommentarer
        if (content.includes('```json')) {
          content = content.replace(/```json\n?/, '').replace(/\n?```$/, '');
        }
        content = content.replace(/\/\/.*$/gm, '');
        content = content.replace(/\/\/.*?(?=\n|$)/g, '');
        content = content.replace(/^\s*[\r\n]/gm, '');
        content = content.replace(/,\s*\/\/.*?(?=\n|,|$)/g, '');
        
        cleanedContent = content;
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
        message: `Skiftplan generert med AI for uke ${weekStart.toLocaleDateString('nb-NO')} - ${weekEnd.toLocaleDateString('nb-NO')}`, 
        shifts: schedule.shifts || [], 
        summary: schedule.summary || {}, 
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
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

  // Behold den gamle månedlige metoden som backup
  @Post('generate-monthly-schedule')
  async generateMonthlySchedule(@Body() body: { month: string }) {
    const totalStartTime = Date.now();
    console.log(`🚀 [PERFORMANCE] Starting monthly schedule generation at ${new Date().toISOString()}`);
    
    try {
        const month = new Date(body.month);
        
        console.log(`⏱️ [PERFORMANCE] Step 1: Fetching employees...`);
        const employeesStartTime = Date.now();
        const dbEmployees = await this.usersService.findAll();
        const employeesEndTime = Date.now();
        console.log(`✅ [PERFORMANCE] Employees fetched in ${employeesEndTime - employeesStartTime}ms (${dbEmployees.length} employees)`);
        
        console.log(`⏱️ [PERFORMANCE] Step 2: Fetching time-off requests...`);
        const timeOffStartTime = Date.now();
        const dbTimeOffRequests = await this.timeOffReqService.findAll();
        const timeOffEndTime = Date.now();
        console.log(`✅ [PERFORMANCE] Time-off requests fetched in ${timeOffEndTime - timeOffStartTime}ms (${dbTimeOffRequests.length} requests)`);

        console.log(`⏱️ [PERFORMANCE] Step 3: Processing data...`);
        const dataProcessingStartTime = Date.now();
        const employees = dbEmployees.map(emp => ({
            id: emp.id, name: emp.name, role: emp.role, preferredShifts: [], positionPercentage: 100
        }));
        const timeOffRequests = dbTimeOffRequests.map(req => ({
            employeeId: req.userId, startDate: req.fromDate, endDate: req.toDate,
            type: this.convertTimeOffType(req.type), status: this.convertRequestStatus(req.status)
        }));
        const dataProcessingEndTime = Date.now();
        console.log(`✅ [PERFORMANCE] Data processing completed in ${dataProcessingEndTime - dataProcessingStartTime}ms`);

        console.log(`⏱️ [PERFORMANCE] Step 4: Building prompt...`);
        const promptStartTime = Date.now();
        const prompt = this.promptBuilder.buildMonthlySchedulePrompt(employees, timeOffRequests, month, []);
        const promptEndTime = Date.now();
        console.log(`✅ [PERFORMANCE] Prompt built in ${promptEndTime - promptStartTime}ms (${prompt.length} characters)`);
        
        console.log(`⏱️ [PERFORMANCE] Step 5: Calling OpenAI API with parallel weeks...`);
        const openaiStartTime = Date.now();
        
        // Del måneden i 4 uker
        const weeks = this.splitMonthIntoWeeks(month);
        console.log(`📅 [PERFORMANCE] Split month into ${weeks.length} weeks`);
        
        // Generer prompts for hver uke
        const weekPrompts = weeks.map((week, index) => 
          this.promptBuilder.buildWeeklySchedulePrompt(employees, timeOffRequests, week.start, week.end)
        );
        
        console.log(`🚀 [PERFORMANCE] Starting ${weekPrompts.length} parallel API calls...`);
        
        // Send alle API-kall samtidig
        const weekResponses = await Promise.all(
          weekPrompts.map((weekPrompt, index) => {
            console.log(`📤 [PERFORMANCE] Starting API call for week ${index + 1}`);
            return this.chatGPTService.generateSchedule(weekPrompt);
          })
        );
        
        console.log(`✅ [PERFORMANCE] All ${weekResponses.length} API calls completed`);
        
        // Kombiner alle uke-responser til en månedlig skiftplan
        const combinedSchedule = this.combineWeeklySchedules(weekResponses);
        
        const openaiEndTime = Date.now();
        console.log(`✅ [PERFORMANCE] Parallel OpenAI API calls completed in ${openaiEndTime - openaiStartTime}ms`);

        // Sjekk om alle uke-responser er gyldige
        const invalidResponses = weekResponses.filter(response => !response.content || response.content.trim() === '');
        if (invalidResponses.length > 0) {
            return { success: false, message: `${invalidResponses.length} uke-responser var tomme` };
        }

        console.log(`⏱️ [PERFORMANCE] Step 6: Parsing combined schedule...`);
        const parsingStartTime = Date.now();
        
        let schedule = combinedSchedule;
        let parsingEndTime: number;
        
        try {
            // combinedSchedule er allerede et objekt, ikke en streng
            parsingEndTime = Date.now();
            console.log(`✅ [PERFORMANCE] Combined schedule parsed in ${parsingEndTime - parsingStartTime}ms`);
        } catch (parseError) {
            console.error('Feil ved kombinerings av uke-skjemaer:', parseError);
            return { 
                success: false, 
                message: 'Feil ved kombinerings av uke-skjemaer.',
                error: parseError.message
            };
        }
        
        const totalEndTime = Date.now();
        const totalTime = totalEndTime - totalStartTime;
        
        console.log(`🎉 [PERFORMANCE] ===== MONTHLY SCHEDULE GENERATION COMPLETED =====`);
        console.log(`📊 [PERFORMANCE] Total time: ${totalTime}ms (${(totalTime/1000).toFixed(2)}s)`);
        console.log(`📊 [PERFORMANCE] Breakdown:`);
        console.log(`   - Employee fetch: ${employeesEndTime - employeesStartTime}ms`);
        console.log(`   - Time-off fetch: ${timeOffEndTime - timeOffStartTime}ms`);
        console.log(`   - Data processing: ${dataProcessingEndTime - dataProcessingStartTime}ms`);
        console.log(`   - Prompt building: ${promptEndTime - promptStartTime}ms`);
        console.log(`   - OpenAI API call: ${openaiEndTime - openaiStartTime}ms`);
        console.log(`   - Response parsing: ${parsingEndTime - parsingStartTime}ms`);
        console.log(`📊 [PERFORMANCE] Prompt size: ${prompt.length} characters`);
        console.log(`📊 [PERFORMANCE] Generated shifts: ${schedule.shifts?.length || 0}`);
        console.log(`🎉 [PERFORMANCE] ================================================`);
        
        return { 
            success: true, 
            message: `Skiftplan generert med AI for ${employees.length} ansatte`, 
            shifts: schedule.shifts || [], 
            summary: schedule.summary || {}, 
            month: month.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' }), 
            employeeCount: employees.length,
            performanceMetrics: {
                totalTime: totalTime,
                employeeFetchTime: employeesEndTime - employeesStartTime,
                timeOffFetchTime: timeOffEndTime - timeOffStartTime,
                dataProcessingTime: dataProcessingEndTime - dataProcessingStartTime,
                promptBuildTime: promptEndTime - promptStartTime,
                openaiApiTime: openaiEndTime - openaiStartTime,
                parsingTime: parsingEndTime - parsingStartTime,
                promptSize: prompt.length,
                shiftsGenerated: schedule.shifts?.length || 0
            }
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

  // ← Del måned i uker for parallelle API-kall
  private splitMonthIntoWeeks(month: Date): Array<{start: Date, end: Date}> {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    const weeks: Array<{start: Date, end: Date}> = [];
    let currentDay = 1;
    
    while (currentDay <= daysInMonth) {
      const startDate = new Date(year, monthIndex, currentDay);
      const endDay = Math.min(currentDay + 6, daysInMonth); // Maks 7 dager
      const endDate = new Date(year, monthIndex, endDay);
      
      weeks.push({
        start: startDate,
        end: endDate
      });
      
      currentDay = endDay + 1;
    }
    
    return weeks;
  }

  // ← Kombiner uke-skjemaer til månedlig skjema
  private combineWeeklySchedules(weekResponses: any[]): any {
    const allShifts: any[] = [];
    let totalShifts = 0;
    let totalHours = 0;
    
    weekResponses.forEach((response, weekIndex) => {
      try {
        let content = response.content;
        
        // Rens JSON
        if (content.includes('```json')) {
          content = content.replace(/```json\n?/, '').replace(/\n?```$/, '');
        }
        content = content.replace(/\/\/.*$/gm, '');
        content = content.replace(/\/\/.*?(?=\n|$)/g, '');
        content = content.replace(/^\s*[\r\n]/gm, '');
        content = content.replace(/,\s*\/\/.*?(?=\n|,|$)/g, '');
        
        const weekSchedule = JSON.parse(content);
        
        if (weekSchedule.shifts && Array.isArray(weekSchedule.shifts)) {
          allShifts.push(...weekSchedule.shifts);
          totalShifts += weekSchedule.shifts.length;
          totalHours += weekSchedule.shifts.reduce((sum: number, shift: any) => sum + (shift.hours || 0), 0);
        }
      } catch (error) {
        console.error(`Feil ved parsing av uke ${weekIndex + 1}:`, error);
      }
    });
    
    return {
      shifts: allShifts,
      summary: {
        totalShifts: totalShifts,
        totalHours: totalHours
      }
    };
  }
}
