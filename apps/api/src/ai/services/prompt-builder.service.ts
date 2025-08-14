import { Injectable } from '@nestjs/common';

export interface Employee {
  id: string;
  name: string;
  role: string;
  preferredShifts?: string[];
  positionPercentage: number;
}

export interface TimeOffRequest {
  employeeId: string;
  startDate: Date;
  endDate: Date;
  type: 'VACATION' | 'SICK_LEAVE' | 'PERSONAL_LEAVE' | 'MATERNITY_LEAVE';
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface ShiftConstraint {
  name: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

@Injectable()
export class PromptBuilder {
  
  buildMonthlySchedulePrompt(
    employees: Employee[],
    timeOffRequests: TimeOffRequest[],
    month: Date,
    constraints: ShiftConstraint[]
  ): string {
    
    const monthName = month.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    
    return `
Du er en ekspert på skiftplanlegging. Lag en skiftplan for ${monthName} (${daysInMonth} dager).

ANSATTE (${employees.length}):
${this.formatEmployeesWithPosition(employees)}

**VIKTIG: Bruk EKSAKTE employeeId verdier fra listen over, ikke oppdikt nye ID-er!**

**KRITISKE SKIFTREGLER (MÅ følges hver dag - INGEN UNNTAK):**
1. DAGVAKT: 07:00-15:00 (8 timer) - MÅ være dekket hver dag
2. MELLOMVAKT: 12:00-20:00 (8 timer) - MÅ være dekket hver dag  
3. KVELDSVAKT: 15:00-23:00 (8 timer) - MÅ være dekket hver dag

**ADMIN REGLER (MÅ følges):**
- Admin jobber KUN ukedager (mandag-fredag)
- Admin skift: 08:30-16:30 (7.5 timer) - IKKE 10:30-18:30!
- IKKE jobb i helger

**SØNDAG REGLER:**
- Søndager er EKSTRA TRAVLE
- MÅ ha MINST 4 personer (ikke bare 3)
- Legg til ekstra skift eller overlappende skift
- Prioriter ansatte med høy stillingsprosent på søndager

**STILLINGSPROSENT REGLER (KRITISK):**
- 100% stilling = 40 timer per uke (8 timer per dag, 5 dager)
- 50% stilling = 20 timer per uke (4 timer per dag, 5 dager)
- 20% stilling = 8 timer per uke (1.6 timer per dag, 5 dager)
- **VIKTIG: Respekter stillingsprosent - deltidsansatte kan IKKE jobbe mer enn tillatt!**

**SKIFT-TYPER (24-timers format - INGEN ANDRE TIDER TILLATT):**
- Dagvakt: 07:00-15:00 (8 timer) - MÅ være hver dag
- Mellomvakt: 12:00-20:00 (8 timer) - MÅ være hver dag
- Kveldsvakt: 15:00-23:00 (8 timer) - MÅ være hver dag
- Nattskift: 23:00-07:00 (8 timer) - Kun hvis nødvendig

**VIKTIGSTE REGLER (INGEN UNNTAK):**
- HVER DAG må ha EKSAKT 3 skift: dagvakt 07:00-15:00, mellomvakt 12:00-20:00, kveldsvakt 15:00-23:00
- SØNDAGER må ha minst 4 personer (ekstra travelt)
- Admin jobber kun ukedager 08:30-16:30 (IKKE 10:30-18:30!)
- **STILLINGSPROSENT MÅ RESPEKTERES** - deltidsansatte jobber IKKE mer enn tillatt
- Bruk EKSAKTE employeeId fra listen
- Starttid må VÆRE FØR sluttid
- **INGEN ANDRE SKIFTTIDER TILLATT** - kun de spesifiserte tider over!

**TIDSREGLER:**
- Starttid må VÆRE FØR sluttid
- Nattskift (23:00-07:00) er tillatt og korrekt
- Alle andre skift må være innen samme dag
- Bruk 24-timers format (00:00-23:59)

OPPGAVE:
Lag en skiftplan for hele ${monthName} som bruker alle tilgjengelige ansatte optimalt.

**VIKTIG: Returner KUN gyldig JSON - ingen annen tekst!**

JSON-struktur:
{
  "shifts": [
    {
      "employeeId": "123",
      "employeeName": "Per Hansen",
      "positionPercentage": 100,
      "date": "2025-01-01",
      "startTime": "09:30",
      "endTime": "16:30",
      "shiftType": "Dagsift",
      "hours": 7
    }
  ],
  "summary": {
    "totalShifts": 0,
    "totalHours": 0
  }
}

**START JSON HER:**
`;
  }

  private formatEmployeesWithPosition(employees: Employee[]): string {
    return employees.map(emp => 
        `- ID: "${emp.id}" | Navn: ${emp.name} | Rolle: ${emp.role} | Stillingsprosent: ${emp.positionPercentage}%`
    ).join('\n');
  }

  private formatTimeOffRequests(requests: TimeOffRequest[], month: Date): string {
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
    const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    
    const relevantRequests = requests.filter(req => 
      req.status === 'APPROVED' && 
      req.startDate <= monthEnd && 
      req.endDate >= monthStart
    );

    if (relevantRequests.length === 0) {
      return '- Ingen godkjent fravær i denne måneden';
    }

    return relevantRequests.map(req => {
      const start = req.startDate.toLocaleDateString('nb-NO');
      const end = req.endDate.toLocaleDateString('nb-NO');
      const employee = this.getEmployeeName(req.employeeId);
      const type = this.translateTimeOffType(req.type);
      
      return `- ${employee}: ${type} fra ${start} til ${end}`;
    }).join('\n');
  }

  private formatConstraints(constraints: ShiftConstraint[]): string {
    if (constraints.length === 0) {
      return '- Ingen spesialregler definert';
    }

    return constraints.map(constraint => 
      `- ${constraint.priority}: ${constraint.name} - ${constraint.description}`
    ).join('\n');
  }

  private getEmployeeName(employeeId: string): string {
    // Dette må implementeres med faktisk employee lookup
    return `Ansatt ${employeeId}`;
  }

  private translateTimeOffType(type: string): string {
    const translations = {
      'VACATION': 'Ferie',
      'SICK_LEAVE': 'Sykdom',
      'PERSONAL_LEAVE': 'Personlig fravær',
      'MATERNITY_LEAVE': 'Foreldrepermisjon'
    };
    return translations[type] || type;
  }
}
