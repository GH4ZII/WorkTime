"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptBuilder = void 0;
const common_1 = require("@nestjs/common");
let PromptBuilder = class PromptBuilder {
    buildWeeklySchedulePrompt(employees, timeOffRequests, weekStart, weekEnd) {
        const weekStartStr = weekStart.toLocaleDateString('nb-NO');
        const weekEndStr = weekEnd.toLocaleDateString('nb-NO');
        return `
Lag en skiftplan for uken ${weekStartStr} til ${weekEndStr}.

ANSATTE (${employees.length}):
${this.formatEmployeesWithPosition(employees)}

**VIKTIG: Bruk EKSAKTE employeeId verdier fra listen over, ikke oppdikt nye ID-er!**

**SKIFTREGLER:**
- Dagvakt: 07:00-15:00 (8 timer) - MÅ være dekket hver dag
- Mellomvakt: 12:00-20:00 (8 timer) - MÅ være dekket hver dag
- Kveldsvakt: 15:00-23:00 (8 timer) - MÅ være dekket hver dag
- Nattskift: 23:00-07:00 (8 timer) - MÅ være dekket hver dag
- Admin: 08:30-16:30 (8 timer) - Kun ukedager

**STILLINGSPROSENT REGLER (KRITISK):**
- 100% stilling = 40 timer per uke
- 50% stilling = 20 timer per uke
- 20% stilling = 8 timer per uke

**VIKTIG: Deltidsansatte kan jobbe MER enn sin stillingsprosent, men IKKE MINDRE!**

**VIKTIGSTE REGLER:**
- HVER DAG må ha 4 skift: dagvakt, mellomvakt, kveldsvakt, nattskift
- SØNDAGER må ha minst 5 personer (ekstra travelt). Dette inkluderer en en 6 timers ekstra mellomvakt
- Admin jobber kun ukedager 08:30-16:30
- **STILLINGSPROSENT MÅ RESPEKTERES som MINIMUM** - deltidsansatte kan jobbe mer enn tillatt
- Bruk EKSAKTE employeeId fra listen
- Starttid må VÆRE FØR sluttid

**VIKTIG: Returner KUN gyldig JSON - ingen annen tekst!**

JSON-struktur:
{
  "shifts": [
    {
      "employeeId": "123",
      "employeeName": "Per Hansen",
      "positionPercentage": 100,
      "date": "2025-08-18",
      "startTime": "07:00",
      "endTime": "15:00",
      "shiftType": "Dagvakt",
      "hours": 8
    }
  ],
  "summary": {
    "totalShifts": 0,
    "totalHours": 0
  }
}

**START JSON HER:**`;
    }
    buildMonthlySchedulePrompt(employees, timeOffRequests, month, constraints) {
        const monthName = month.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' });
        const year = month.getFullYear();
        const monthNum = (month.getMonth() + 1).toString().padStart(2, '0');
        const daysInMonth = new Date(year, month.getMonth() + 1, 0).getDate();
        return `
Lag en skiftplan for ${monthName} (${year}-${monthNum}-01 til ${year}-${monthNum}-${daysInMonth}).

ANSATTE (${employees.length}):
${this.formatEmployeesWithPosition(employees)}

**VIKTIG: Bruk EKSAKTE employeeId verdier fra listen over, ikke oppdikt nye ID-er!**

**SKIFTREGLER:**
- Dagvakt: 07:00-15:00 (8 timer) - MÅ være dekket hver dag
- Mellomvakt: 12:00-20:00 (8 timer) - MÅ være dekket hver dag
- Kveldsvakt: 15:00-23:00 (8 timer) - MÅ være dekket hver dag
- Nattskift: 23:00-07:00 (8 timer) - MÅ være dekket hver dag
- Admin: 08:30-16:30 (8 timer) - Kun ukedager

**STILLINGSPROSENT REGLER (KRITISK):**
- 100% stilling = 40 timer per uke
- 50% stilling = 20 timer per uke
- 20% stilling = 8 timer per uke

**VIKTIG: Deltidsansatte kan jobbe MER enn sin stillingsprosent, men IKKE MINDRE!**

**MÅNEDLIGE MØNSTRE (KRITISK FOR KONSISTENS):**
- Roter skift systematisk mellom ansatte for å unngå variasjon
- Hver ansatt skal ha et forutsigbart mønster gjennom måneden
- Nattskift: Maks 2-3 per uke per ansatt, roter mellom ansatte
- Dagvakter: Fordel jevnt mellom ansatte
- Kveldsvakter: Roter systematisk
- Admin: Kun ukedager, samme ansatt hver dag hvis mulig

**VIKTIGSTE REGLER:**
- HVER DAG må ha 4 skift: dagvakt, mellomvakt, kveldsvakt, nattskift
- SØNDAGER må ha minst 5 personer (ekstra travelt). Dette inkluderer en 6 timers ekstra mellomvakt
- Admin jobber kun ukedager 08:30-16:30
- **STILLINGSPROSENT MÅ RESPEKTERES som MINIMUM** - deltidsansatte kan jobbe mer enn tillatt
- Bruk EKSAKTE employeeId fra listen
- Starttid må VÆRE FØR sluttid
- **OPRETTHOLD KONSISTENTE MØNSTRE** - ikke gi ansatte veldig varierte skift

**VIKTIG: Returner KUN gyldig JSON - ingen annen tekst!**

JSON-struktur:
{
  "shifts": [
    {
      "employeeId": "123",
      "employeeName": "Per Hansen",
      "positionPercentage": 100,
      "date": "${year}-${monthNum}-01",
      "startTime": "07:00",
      "endTime": "15:00",
      "shiftType": "Dagvakt",
      "hours": 8
    }
  ],
  "summary": {
    "totalShifts": 0,
    "totalHours": 0
  }
}

**START JSON HER:**`;
    }
    formatEmployeesWithPosition(employees) {
        return employees.map(emp => `- ID: "${emp.id}" | Navn: ${emp.name} | Rolle: ${emp.role} | Stillingsprosent: ${emp.positionPercentage}%`).join('\n');
    }
    formatTimeOffRequests(requests, month) {
        const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        const relevantRequests = requests.filter(req => req.status === 'APPROVED' &&
            req.startDate <= monthEnd &&
            req.endDate >= monthStart);
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
    formatConstraints(constraints) {
        if (constraints.length === 0) {
            return '- Ingen spesialregler definert';
        }
        return constraints.map(constraint => `- ${constraint.priority}: ${constraint.name} - ${constraint.description}`).join('\n');
    }
    getEmployeeName(employeeId) {
        return `Ansatt ${employeeId}`;
    }
    translateTimeOffType(type) {
        const translations = {
            'VACATION': 'Ferie',
            'SICK_LEAVE': 'Sykdom',
            'PERSONAL_LEAVE': 'Personlig fravær',
            'MATERNITY_LEAVE': 'Foreldrepermisjon'
        };
        return translations[type] || type;
    }
};
exports.PromptBuilder = PromptBuilder;
exports.PromptBuilder = PromptBuilder = __decorate([
    (0, common_1.Injectable)()
], PromptBuilder);
//# sourceMappingURL=prompt-builder.service.js.map