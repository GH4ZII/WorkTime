# AI Skiftplanlegging - Forbedringer

## Problem
AI'en fulgte ikke prompten ordentlig og genererte tilfeldige skift som ikke dekket alle nødvendige skift eller respekterte stillingsprosenter.

## Løsninger implementert

### 1. Ny AI-tjeneste (`apps/api/src/ai/services/ai.service.ts`)
- **Validering**: Validerer at AI-responsen følger alle regler
- **Retry-logikk**: Prøver opptil 3 ganger hvis AI'en ikke følger prompten
- **Bedre feilhåndtering**: Gir spesifikke feilmeldinger for hva som er galt

### 2. Forbedret prompt-builder (`apps/api/src/ai/services/prompt-builder.service.ts`)
- **Kortere og tydeligere prompt**: Fjernet unødvendig kompleksitet
- **Eksempel på korrekt skift**: Viser AI'en nøyaktig hva den skal returnere
- **Fravær-informasjon**: Inkluderer godkjent fravær i prompten
- **Tydelige regler**: Markert med "INGEN UNNTAK" for kritiske regler

### 3. Oppdatert ChatGPT-tjeneste (`apps/api/src/ai/services/chatgpt.service.ts`)
- **Lavere temperatur**: Redusert fra 0.7 til 0.1 for mer konsistente resultater
- **Bedre token-håndtering**: Optimalisert for skiftplanlegging

### 4. Validering av skiftplan
- **Skift-per-dag**: Sjekker at hver dag har minst 3 skift
- **Skift-typer**: Validerer at dagvakt, mellomvakt og kveldsvakt er dekket
- **EmployeeId-validering**: Sjekker at alle ID-er eksisterer
- **Stillingsprosent**: Validerer at deltidsansatte ikke jobber mer enn tillatt

## Hvordan det fungerer nå

1. **Prompt genereres** med faktiske ansatte, fravær og regler
2. **AI genererer skiftplan** med lavere temperatur for konsistens
3. **Respons valideres** mot alle regler
4. **Hvis feil**: Prøver igjen med forbedret prompt
5. **Hvis fortsatt feil**: Gir spesifikk feilmelding om hva som er galt

## Regler som valideres

- ✅ Hver dag må ha 3 skift (dagvakt, mellomvakt, kveldsvakt)
- ✅ Søndager må ha minst 4 personer
- ✅ Admin jobber kun ukedager
- ✅ Stillingsprosent må respekteres
- ✅ Kun gyldige employeeId-er tillatt
- ✅ Skifttider må være korrekte (07:00-15:00, 12:00-20:00, 15:00-23:00)

## Testing

For å teste forbedringene:

1. **Start API-en**: `npm run start:dev`
2. **Test AI-tjenesten**: `POST /ai/generate-monthly-schedule`
3. **Sjekk loggene** for validering og retry-forsøk
4. **Verifiser skiftplanen** at den følger alle regler

## Fremtidige forbedringer

- [ ] Legg til flere skift-typer (nattskift, helge-skift)
- [ ] Implementer arbeidsmiljø-regler (maks timer per dag/uke)
- [ ] Legg til preferanser for ansatte
- [ ] Implementer automatisk optimalisering av skiftplan
