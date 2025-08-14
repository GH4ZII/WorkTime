# 🤖 AI Skiftplanlegging med ChatGPT - Implementasjonsguide

## 📋 Oversikt
Denne guiden beskriver steg for steg hvordan vi implementerer AI-drevet automatisk skiftplanlegging i WorkTime-prosjektet ved hjelp av OpenAI's ChatGPT API. Systemet vil kunne generere optimale skiftplaner for en hel uke basert på ansattes tilgjengelighet, kompetanse og organisasjonens regler.

## 🎯 Mål
- Automatisk generering av ukesplaner med ChatGPT
- Optimal fordeling av arbeidsbyrde
- Respektering av arbeidstidsregler og hvileperioder
- Brukervennlig grensesnitt for administratorer
- Integrasjon med eksisterende skift- og fraværsystem

## 🏗️ Arkitektur

### Backend (NestJS)
```text
apps/api/src/ai/
├── ai.module.ts              # AI-modul konfigurasjon
├── ai.service.ts             # ChatGPT integrasjon og hovedlogikk
├── ai.controller.ts          # API-endepunkter
├── dto/                      # Data Transfer Objects
│   ├── generate-schedule.dto.ts
│   ├── schedule-constraints.dto.ts
│   └── optimization-rules.dto.ts
├── services/                 # AI-tjenester
│   ├── chatgpt.service.ts   # OpenAI API integrasjon
│   ├── prompt-builder.ts    # Prompt-generering for ChatGPT
│   └── response-parser.ts   # Parsing av AI-responser
├── models/                   # Datamodeller
│   ├── employee-availability.ts
│   ├── shift-patterns.ts
│   └── schedule-constraints.ts
└── utils/                    # Hjelpefunksjoner
    ├── date-helpers.ts
    ├── validation-helpers.ts
    └── schedule-helpers.ts
```

### Frontend (Web)
```
apps/web/
├── pages/
│   └── ai-scheduler.tsx      # AI-planlegger hovedside
├── components/
│   └── ai/
│       ├── ScheduleGenerator.tsx    # Ukesplan generator
│       ├── ConstraintEditor.tsx     # Regelredigering
│       ├── ScheduleVisualizer.tsx   # Kalender-visning
│       └── OptimizationPanel.tsx    # Optimaliseringsinnstillinger
└── context/
    └── AiSchedulerContext.tsx       # AI-planlegger state management
```

### Mobile App
```
apps/mobile/src/
├── screens/
│   └── AiScheduleScreen.tsx         # AI-genererte skift visning
└── components/
    └── ai/
        ├── AiShiftCard.tsx          # AI-skift kort
        └── ScheduleApproval.tsx     # Godkjenning av skift
```

## 📝 Implementasjonssteg

### Fase 1: Backend Grunnstruktur ⏱️ Estimat: 2-3 dager

#### Dag 1: Opprett AI-modul og ChatGPT integrasjon
- [ ] Opprett `apps/api/src/ai/` mappe
- [ ] Installer OpenAI SDK: `npm install openai`
- [ ] Opprett `ai.module.ts` med grunnleggende konfigurasjon
- [ ] Opprett `chatgpt.service.ts` med OpenAI integrasjon
- [ ] Opprett `ai.controller.ts` med placeholder endpoints
- [ ] Opprett DTO-filer for grunnleggende datastrukturer

#### Dag 2: Database Schema Utvidelser
- [ ] Opprett Prisma migration for AI-genererte skift
- [ ] Legg til `AiGeneratedSchedule` modell i schema.prisma
- [ ] Legg til `ScheduleConstraint` modell i schema.prisma
- [ ] Oppdater eksisterende `Shift` modell med AI-relasjoner
- [ ] Kjør migration og oppdater Prisma client

#### Dag 3: ChatGPT Service og Prompt Engineering
- [ ] Implementer `ChatGPTService` med OpenAI API
- [ ] Opprett `PromptBuilder` for å generere gode prompts
- [ ] Implementer `ResponseParser` for å parse AI-responser
- [ ] Test ChatGPT-integrasjonen
- [ ] Implementer error handling og fallback

### Fase 2: AI Service og Prompt Engineering ⏱️ Estimat: 2-3 dager

#### Dag 4: Prompt Engineering
- [ ] Design effektive prompts for skiftplanlegging
- [ ] Implementer prompt templates med variabler
- [ ] Test ulike prompt-formater
- [ ] Optimaliser prompts for beste resultater
- [ ] Implementer prompt caching

#### Dag 5: Response Parsing og Validering
- [ ] Implementer robust parsing av ChatGPT-responser
- [ ] Legg til validering av genererte skiftplaner
- [ ] Implementer fallback hvis AI-feiler
- [ ] Test parsing med ulike respons-formater
- [ ] Legg til error handling for ugyldige responser

#### Dag 6: AI Service Integration
- [ ] Integrer ChatGPT service med hovedlogikken
- [ ] Implementer `generateWeeklySchedule` med AI
- [ ] Legg til constraint-validering
- [ ] Test hele AI-workflow
- [ ] Implementer logging og monitoring

### Fase 3: API Integration ⏱️ Estimat: 1-2 dager

#### Dag 7: API Endpoints
- [ ] Implementer `POST /ai/generate-weekly-schedule`
- [ ] Implementer `POST /ai/optimize-existing-schedule`
- [ ] Implementer `GET /ai/schedule-constraints`
- [ ] Implementer `PUT /ai/schedule-constraints`
- [ ] Legg til JWT autentisering og rollevalidering

#### Dag 8: Error Handling & Validation
- [ ] Implementer omfattende feilhåndtering
- [ ] Legg til input-validering med class-validator
- [ ] Opprett custom exceptions for AI-feil
- [ ] Implementer logging for AI-operasjoner
- [ ] Test API-endepunktene

### Fase 4: Frontend Web ⏱️ Estimat: 3-4 dager

#### Dag 9: AI Scheduler Side
- [ ] Opprett `apps/web/pages/ai-scheduler.tsx`
- [ ] Implementer grunnleggende layout og styling
- [ ] Opprett `AiSchedulerContext` for state management
- [ ] Implementer API-integrasjon med backend

#### Dag 10: Schedule Generator Komponent
- [ ] Opprett `ScheduleGenerator.tsx` komponent
- [ ] Implementer form for ukesplan parametere
- [ ] Legg til dato-velger for uke
- [ ] Implementer constraint-redigering
- [ ] Legg til "Generer Plan med AI" knapp

#### Dag 11: Schedule Visualizer
- [ ] Opprett `ScheduleVisualizer.tsx` komponent
- [ ] Implementer kalender-visning av generert plan
- [ ] Legg til drag-and-drop for manuell justering
- [ ] Implementer skift-detaljer visning
- [ ] Legg til godkjenning/forkast funksjonalitet

#### Dag 12: Constraint Editor
- [ ] Opprett `ConstraintEditor.tsx` komponent
- [ ] Implementer regelredigering interface
- [ ] Legg til prioritetsjustering
- [ ] Implementer regel-aktivering/deaktivering
- [ ] Test hele AI-planlegger workflow

### Fase 5: Mobile App Integration ⏱️ Estimat: 2-3 dager

#### Dag 13: AI Schedule Screen
- [ ] Opprett `AiScheduleScreen.tsx`
- [ ] Implementer visning av AI-genererte skift
- [ ] Legg til godkjenning/forkast funksjonalitet
- [ ] Integrer med eksisterende navigasjon

#### Dag 14: AI Components
- [ ] Opprett `AiShiftCard.tsx` komponent
- [ ] Implementer `ScheduleApproval.tsx` komponent
- [ ] Legg til notifikasjoner for nye AI-planer
- [ ] Test mobile AI-funksjonalitet

### Fase 6: Testing & Optimalisering ⏱️ Estimat: 2-3 dager

#### Dag 15: Unit Testing
- [ ] Skriv tester for AI service
- [ ] Test ChatGPT integrasjon
- [ ] Test response parsing
- [ ] Test API endpoints
- [ ] Oppnå minst 80% test coverage

#### Dag 16: Integration Testing
- [ ] Test hele AI-planlegger workflow
- [ ] Test med ulike constraint-konfigurasjoner
- [ ] Test feilhåndtering og fallback
- [ ] Test performance og API-limits

#### Dag 17: Optimalisering & Bugfixes
- [ ] Optimaliser prompts for bedre resultater
- [ ] Implementer prompt caching
- [ ] Fiks identifiserte bugs
- [ ] Dokumenter API og brukergrensesnitt

## 🛠️ Tekniske Krav

### Dependencies
```json
{
  "dependencies": {
    "openai": "^4.20.0",
    "date-fns": "^2.30.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1"
  }
}
```

### Miljøvariabler
```env
# OpenAI API konfigurasjon
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

# AI Service konfigurasjon
AI_FALLBACK_ENABLED=true
AI_PROMPT_CACHE_TTL=3600
```

### Database Migrations
```sql
-- AI Generated Schedules
CREATE TABLE "AiGeneratedSchedule" (
  "id" TEXT NOT NULL,
  "weekStart" DATETIME NOT NULL,
  "weekEnd" DATETIME NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "generatedBy" TEXT NOT NULL,
  "approvedBy" TEXT,
  "aiPrompt" TEXT,
  "aiResponse" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  PRIMARY KEY ("id")
);

-- Schedule Constraints
CREATE TABLE "ScheduleConstraint" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "priority" INTEGER NOT NULL DEFAULT 1,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY ("id")
);
```

## 🤖 ChatGPT Implementasjonsdetaljer

### 1. Prompt Engineering
```typescript
// apps/api/src/ai/services/prompt-builder.ts
export class PromptBuilder {
    buildSchedulePrompt(employees: Employee[], constraints: Constraint[], weekStart: Date): string {
        return `
Du er en ekspert på skiftplanlegging. Generer en optimal skiftplan for følgende uke basert på disse kriteriene:

UKE: ${this.formatWeek(weekStart)}

ANSATTE:
${this.formatEmployees(employees)}

REGLER:
${this.formatConstraints(constraints)}

Generer en skiftplan som:
1. Respekterer alle arbeidstidsregler
2. Balanserer arbeidsbyrde jevnt
3. Tar hensyn til ansattes kompetanse
4. Minimiserer overtidskostnader

Returner svaret som JSON med denne strukturen:
{
    "weekStart": "2025-01-20",
    "weekEnd": "2025-01-26",
    "shifts": [
        {
            "employeeId": "123",
            "day": 1,
            "startTime": "08:00",
            "endTime": "16:00",
            "location": "Hovedkontor",
            "notes": "Morgenskift"
        }
    ],
    "summary": {
        "totalHours": 168,
        "averageHoursPerEmployee": 33.6,
        "overtimeHours": 0
    }
}
        `;
    }
}
```

### 2. ChatGPT Service
```typescript
// apps/api/src/ai/services/chatgpt.service.ts
import OpenAI from 'openai';

export class ChatGPTService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateSchedule(prompt: string): Promise<string> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: process.env.OPENAI_MODEL || 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
                temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
            });

            return completion.choices[0].message.content || '';
        } catch (error) {
            console.error('ChatGPT API feil:', error);
            throw new Error('Kunne ikke generere skiftplan med AI');
        }
    }
}
```

### 3. Response Parser
```typescript
// apps/api/src/ai/services/response-parser.ts
export class ResponseParser {
    parseScheduleResponse(response: string): ParsedSchedule {
        try {
            const parsed = JSON.parse(response);
            
            // Valider at responsen har riktig struktur
            if (!this.isValidScheduleResponse(parsed)) {
                throw new Error('Ugyldig respons-struktur fra AI');
            }
            
            return this.transformToSchedule(parsed);
        } catch (error) {
            throw new Error(`Kunne ikke parse AI-respons: ${error.message}`);
        }
    }

    private isValidScheduleResponse(data: any): boolean {
        return data.weekStart && 
               data.weekEnd && 
               Array.isArray(data.shifts) && 
               data.summary;
    }
}
```

## 📈 Fordeler med ChatGPT-tilnærmingen

✅ **90% mindre kode** å implementere  
✅ **Mye raskere** å få på plass (2-3 uker vs 6-8 uker)  
✅ **Bedre resultater** - GPT-4 er veldig smart på planlegging  
✅ **Enklere vedlikehold** - mindre kompleks kode  
✅ **Automatisk oppdateringer** - OpenAI forbedrer modellene  
✅ **Ingen matematikk** - AI håndterer kompleksiteten  

## ⚠️ Ulemper og Begrensninger

❌ **API-kostnader** (~$50-200/mnd avhengig av bruk)  
❌ **Nettverksavhengighet** - trenger internett  
❌ **API-rate limits** - maks antall forespørsler per minutt  
❌ **Mindre kontroll** - kan ikke tilpasse algoritmene direkte  

## 💰 Kostnadsestimater

### OpenAI API (GPT-4)
- **Input tokens:** ~$0.03 per 1K tokens
- **Output tokens:** ~$0.06 per 1K tokens
- **Typisk skiftplan:** ~500-1000 tokens
- **Kostnad per plan:** ~$0.02-0.05
- **Månedlig kostnad (100 planer):** ~$2-5

### Alternativer
- **GPT-3.5-turbo:** 50% billigere, men mindre smart
- **Claude (Anthropic):** Lignende pris, alternativ til OpenAI

## 🔒 Sikkerhet og Privatliv

- **Ingen sensitive data** sendes til OpenAI
- **Kun anonymiserte data** i prompts
- **API-nøkkel** lagres sikkert i miljøvariabler
- **Audit logging** for alle AI-operasjoner

## 📚 Dokumentasjon

- API dokumentasjon med Swagger/OpenAPI
- Brukerguide for AI-planlegger
- Prompt engineering guide
- Troubleshooting guide
- Cost optimization guide

## 📈 Deployment

### Staging
- Test AI-funksjonalitet i staging-miljø
- Valider med testdata
- Test API-limits og error handling

### Production
- Graduell rollout til administratorer
- Monitoring av AI-operasjoner og kostnader
- Backup av eksisterende skiftdata

## 📈 Fremtidige Utvidelser

### Fase 7: Avansert Prompt Engineering
- Dynamiske prompts basert på kontekst
- Prompt templates for ulike scenarier
- A/B testing av prompts

### Fase 8: Multi-AI Provider
- Støtte for Claude, Gemini, etc.
- Fallback mellom ulike AI-tjenester
- Kostnadsoptimalisering

## ✅ Sjekkliste for Fullføring

- [ ] Backend AI-modul med ChatGPT implementert
- [ ] Database schema oppdatert
- [ ] ChatGPT integrasjon fungerer
- [ ] API endpoints fungerer
- [ ] Web frontend implementert
- [ ] Mobile app integrasjon fullført
- [ ] Testing fullført
- [ ] Dokumentasjon oppdatert
- [ ] Kostnadsestimater validert
- [ ] Sikkerhetstesting fullført

##  Suksesskriterier

- AI kan generere ukesplaner på under 10 sekunder
- Alle arbeidstidsregler respekteres
- Administratorer kan enkelt redigere og godkjenne planer
- Systemet håndterer 50+ ansatte effektivt
- Mobile app viser AI-genererte skift korrekt
- Månedlige AI-kostnader under $50
- Ingen kritiske bugs i produksjon

---

**Totalt estimert tid: 12-18 dager**  
**Prioritet: Høy**  
**Kompleksitet: Middels**  
**Team størrelse: 1-2 utviklere**  
**Månedlige kostnader: $2-50 (avhengig av bruk)**
```

Nå har jeg oppdatert to-do listen til å fokusere på ChatGPT-integrasjon i stedet for lokal AI-implementering. Dette gjør prosjektet:

1. **Mye enklere** - 90% mindre kode å skrive
2. **Raskere** - 12-18 dager vs 16-22 dager
3. **Bedre resultater** - GPT-4 er veldig smart på planlegging
4. **Enklere å vedlikeholde** - mindre kompleks kode

Hovedfokuset er nå på:
- **ChatGPT API integrasjon**
- **Prompt engineering** for gode resultater
- **Response parsing** og validering
- **Error handling** og fallback

Vil du at jeg begynner med implementasjonen av ChatGPT-integrasjonen?

