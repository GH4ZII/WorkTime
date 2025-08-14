import { Injectable } from '@nestjs/common';

export interface Employee {
  id: string;
  name: string;
  role: string;
  preferredShifts: string[];
  positionPercentage: number; // Kun stillingsprosent
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
Du er en ekspert på skiftplanlegging for hele måneden. Lag en optimal skiftplan for ${monthName} (${daysInMonth} dager) basert på følgende informasjon:

TILGJENGELIGE ANSATTE (${employees.length}):
${this.formatEmployeesWithPosition(employees)}

FRAVÆR I MÅNEDEN:
${this.formatTimeOffRequests(timeOffRequests, month)}

ARBEIDSTIDSREGLER:
- Maks timer per dag basert på stillingsprosent
- Maks timer per uke basert på stillingsprosent
- 11 timer hvile mellom skift
- Maks 6 dager på rad uten hviledag
- Balanser arbeidsbyrde jevnt mellom ansatte
- Respekter ansattes preferanser når mulig
- **VIKTIG: Respekter stillingsprosent - deltidsansatte kan ikke jobbe mer enn tillatt**

SKIFT-TYPER:
- Morgenskift: 07:00-15:00
- Dagsift: 09:30-16:30
- Ettermiddagsskift: 15:00-23:00
- Nattskift: 23:00-07:00

STILLINGSPROSENT REGLER (40t full stilling som basis):
- 100% stilling: Maks 40 timer per uke
- 95% stilling: Maks 38 timer per uke
- 90% stilling: Maks 36 timer per uke
- 85% stilling: Maks 34 timer per uke
- 80% stilling: Maks 32 timer per uke
- 75% stilling: Maks 30 timer per uke
- 70% stilling: Maks 28 timer per uke
- 65% stilling: Maks 26 timer per uke
- 60% stilling: Maks 24 timer per uke
- 55% stilling: Maks 22 timer per uke
- 50% stilling: Maks 20 timer per uke
- 45% stilling: Maks 18 timer per uke
- 40% stilling: Maks 16 timer per uke
- 35% stilling: Maks 14 timer per uke
- 30% stilling: Maks 12 timer per uke
- 25% stilling: Maks 10 timer per uke
- 20% stilling: Maks 8 timer per uke
- 15% stilling: Maks 6 timer per uke
- 10% stilling: Maks 4 timer per uke
- 5% stilling: Maks 2 timer per uke

SPESIALREGLER:
${this.formatConstraints(constraints)}

OPPGAVE:
Lag en komplett skiftplan for hele ${monthName} som:
1. **Bruker ALLE tilgjengelige ansatte** automatisk (ingen fast antall)
2. **Respekterer stillingsprosent** - deltidsansatte jobber ikke mer enn tillatt
3. Respekterer alle arbeidstidsregler
4. Tar hensyn til fravær (ferie, sykdom, etc.)
5. Balanserer arbeidsbyrde jevnt
6. Minimiserer overtidskostnader
7. Bruker ansattes kompetanse optimalt

VIKTIG: 
- **Ikke begrens antall ansatte** - bruk alle som er tilgjengelige
- **Respekter stillingsprosent** - deltidsansatte kan ikke jobbe mer enn tillatt
- **Fyll alle skift** med tilgjengelige ansatte
- **Sjekk at ingen ansatte jobber når de har fravær godkjent**
- **Optimaliser for beste dekning** av alle skift

Returner svaret som JSON med denne strukturen:
{
  "month": "${monthName}",
  "totalDays": ${daysInMonth},
  "availableEmployees": ${employees.length},
  "shifts": [
    {
      "employeeId": "123",
      "employeeName": "Per Hansen",
      "positionPercentage": 100,
      "date": "2025-01-01",
      "dayOfWeek": "onsdag",
      "startTime": "09:30",
      "endTime": "16:30",
      "shiftType": "Dagsift",
      "hours": 7,
      "notes": "Dagsift"
    }
  ],
  "summary": {
    "totalShifts": 0,
    "totalHours": 0,
    "averageHoursPerEmployee": 0,
    "overtimeHours": 0,
    "employeesWithOvertime": [],
    "coverage": {
      "morningShifts": 0,
      "dayShifts": 0,
      "eveningShifts": 0,
      "nightShifts": 0
    },
    "positionPercentageSummary": {
      "fullTime100": { count: 0, totalHours: 0 },
      "partTime95": { count: 0, totalHours: 0 },
      "partTime90": { count: 0, totalHours: 0 },
      "partTime85": { count: 0, totalHours: 0 },
      "partTime80": { count: 0, totalHours: 0 },
      "partTime75": { count: 0, totalHours: 0 },
      "partTime70": { count: 0, totalHours: 0 },
      "partTime65": { count: 0, totalHours: 0 },
      "partTime60": { count: 0, totalHours: 0 },
      "partTime55": { count: 0, totalHours: 0 },
      "partTime50": { count: 0, totalHours: 0 },
      "partTime45": { count: 0, totalHours: 0 },
      "partTime40": { count: 0, totalHours: 0 },
      "partTime35": { count: 0, totalHours: 0 },
      "partTime30": { count: 0, totalHours: 0 },
      "partTime25": { count: 0, totalHours: 0 },
      "partTime20": { count: 0, totalHours: 0 },
      "partTime15": { count: 0, totalHours: 0 },
      "partTime10": { count: 0, totalHours: 0 },
      "partTime5": { count: 0, totalHours: 0 }
    }
  },
  "constraints": {
    "violations": [],
    "warnings": []
  }
}

HUSK: Bruk ALLE tilgjengelige ansatte optimalt - men respekter stillingsprosent!
    `;
  }

  private formatEmployeesWithPosition(employees: Employee[]): string {
    return employees.map(emp => 
      `- ${emp.name} (${emp.role}): ${emp.positionPercentage}% stilling, Preferanser: ${emp.preferredShifts.join(', ')}`
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