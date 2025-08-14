# 🤖 AI Skiftplanlegging - Workflow Forklaring

## 📖 Hva er dette?
Dette dokumentet forklarer **enkelt og tydelig** hvordan hele AI-skiftplanleggingssystemet fungerer, fra start til slutt. Du trenger ikke være teknisk for å forstå det!

## 🎯 Hva gjør systemet?
**Kort sagt:** En AI (ChatGPT) lager automatisk skiftplaner for deg, så du slipper å gjøre det manuelt.

## 🔄 Hele Workflowen (Steg for Steg)

### 1️⃣ **Administrator starter AI-planleggeren**
- Går inn på web-dashbordet
- Klikker på "AI Skiftplanlegger"
- Velger hvilken uke han vil ha plan for

### 2️⃣ **Systemet samler informasjon**
- Henter alle ansatte fra databasen
- Sjekker hvem som er tilgjengelige
- Henter eksisterende skift og fravær
- Sjekker arbeidstidsregler

### 3️⃣ **AI får beskjed om oppgaven**
Systemet sender en "prompt" (instruksjon) til ChatGPT som sier:
```
"Hei ChatGPT! Lag en skiftplan for uke 34 med disse ansatte:
- Per (kan jobbe 08:00-16:00)
- Kari (kan jobbe 12:00-20:00)
- Ole (kan jobbe 06:00-14:00)

Regler:
- Maks 8 timer per dag
- Må ha 11 timer hvile mellom skift
- Balanser arbeidsbyrde jevnt

Lag en plan som respekterer alle regler!"
```

### 4️⃣ **ChatGPT tenker og svarer**
- AI analyserer alle kriteriene
- Beregner optimal fordeling
- Sender tilbake en ferdig skiftplan i JSON-format

### 5️⃣ **Systemet behandler svaret**
- Parser AI-svaret
- Validerer at planen følger reglene
- Lagrer planen i databasen
- Viser den til administratoren

### 6️⃣ **Administrator godkjenner**
- Ser den genererte planen
- Kan gjøre små justeringer hvis nødvendig
- Godkjenner planen
- Systemet oppretter faktiske skift

### 7️⃣ **Ansatte ser sine skift**
- Skift vises i mobil-appen
- Kalenderen oppdateres
- Notifikasjoner sendes ut

## 🏗️ Teknisk Arkitektur (Enkelt forklart)

### **Backend (Server)**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web App       │    │   NestJS API    │    │   OpenAI API    │
│   (Dashboard)   │◄──►│   (Server)      │◄──►│   (ChatGPT)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Hvordan de snakker sammen:**
1. **Web App** → **NestJS API**: "Lag en skiftplan for uke 34"
2. **NestJS API** → **OpenAI API**: "Hei ChatGPT, her er oppgaven..."
3. **OpenAI API** → **NestJS API**: "Her er skiftplanen din!"
4. **NestJS API** → **Web App**: "Her er den ferdige planen!"

##  Filer og Hva de Gjør

### **Backend (apps/api/src/ai/)**
- **`ai.module.ts`** - Forteller NestJS hvilke deler som hører sammen
- **`ai.controller.ts`** - Mottar forespørsler fra web-appen
- **`ai.service.ts`** - Hovedlogikken for skiftplanlegging
- **`chatgpt.service.ts`** - Snakker med OpenAI API
- **`prompt-builder.ts`** - Lager gode instruksjoner til AI
- **`response-parser.ts`** - Tolker AI-svaret

### **Frontend (apps/web/)**
- **`ai-scheduler.tsx`** - Hovedsiden for AI-planleggeren
- **`ScheduleGenerator.tsx`** - Knapper og innstillinger
- **`ScheduleVisualizer.tsx`** - Viser den genererte planen

### **Mobile (apps/mobile/)**
- **`AiScheduleScreen.tsx`** - Viser AI-genererte skift

##  Viktige Begreper

### **Prompt**
- En instruksjon til AI-en
- Som å gi en ansatt en oppgave
- Jo bedre instruksjon, jo bedre resultat

### **API (Application Programming Interface)**
- Som en "telefon" mellom systemer
- Lar web-appen snakke med serveren
- Lar serveren snakke med OpenAI

### **JSON**
- Et format for å sende data
- Som en digital "liste" eller "tabell"
- AI-en sender skiftplanen i dette formatet

### **Token**
- OpenAI's måte å måle tekst på
- 1 token ≈ 4 bokstaver
- Kostnaden baseres på antall tokens

##  Hvorfor ChatGPT?

### **Alternativ 1: Lage egen AI (6-8 uker)**
- Må skrive kompleks matematikk
- Må teste og finjustere algoritmer
- Må vedlikeholde koden
- Risiko for bugs

### **Alternativ 2: ChatGPT (2-3 uker)**
- OpenAI har allerede løst problemet
- AI-en er allerede smart
- Mindre kode å skrive
- Automatiske oppdateringer

## 🚀 Hvordan Kommer Vi Dit?

### **Fase 1: Grunnstruktur (1 uke)**
- ✅ AI-modul opprettet
- ✅ ChatGPT service implementert
- ✅ Grunnleggende API-endepunkter

### **Fase 2: Prompt Engineering (1 uke)**
- Lære AI-en å lage gode skiftplaner
- Teste ulike instruksjoner
- Finjustere for beste resultater

### **Fase 3: Web Interface (1 uke)**
- Lage dashboard for AI-planleggeren
- Implementere skift-visning
- Legge til godkjenning/forkast

### **Fase 4: Testing (1 uke)**
- Teste med ekte data
- Fikse bugs
- Optimalisere ytelse

## ⚠️ Hva Kan Gå Galt?

### **OpenAI API-feil**
- Ingen internett
- Ingen kreditter igjen
- API-nøkkel utløpt

### **Dårlige resultater**
- AI-en forstår ikke oppgaven
- Prompt er for vag
- Regler er for kompliserte

### **Høy kostnad**
- For mange API-kall
- For lange prompts
- Bruker for dyr modell

## ️ Hvordan Unngår Vi Problemer?

### **Fallback-system**
- Hvis AI feiler, bruk manuell planlegging
- Lagre gode prompts for gjenbruk
- Cache vanlige svar

### **Validering**
- Sjekk at AI-planen følger reglene
- La administrator godkjenne før bruk
- Logg alle AI-operasjoner

### **Kostnadskontroll**
- Bruk billigere modell (GPT-5-nano)
- Begrens antall API-kall
- Optimaliser prompt-lengde

## 📊 Hva Får Vi?

### **Før (Manuell planlegging)**
- 2-3 timer per uke
- Risiko for feil
- Vanskelig å optimalisere
- Kjedelig repetitivt arbeid

### **Etter (AI-planlegging)**
- 5 minutter per uke
- Konsistente resultater
- Optimal fordeling
- Fokus på viktigere oppgaver

## 🎯 Neste Steg

1. **Teste ChatGPT-integrasjonen** (gjort!)
2. **Lage gode prompts** for skiftplanlegging
3. **Implementere web-interface**
4. **Teste med ekte data**
5. **Lansere for administratorer**

## ❓ Vanlige Spørsmål

### **"Hvorfor ikke bare bruke Excel?"**
- Excel kan ikke optimalisere automatisk
- Ingen validering av regler
- Vanskelig å dele og oppdatere

### **"Er AI-en smart nok?"**
- ChatGPT er veldig smart på planlegging
- Kan håndtere komplekse regler
- Lærer av eksempler

### **"Hva hvis AI-en feiler?"**
- Fallback til manuell planlegging
- Administrator kan alltid justere
- Systemet fungerer uansett

### **"Hvor mye koster det?"**
- GPT-5-nano: ~$0.15 per 1M tokens
- Typisk skiftplan: ~$0.01-0.05
- Månedlig: $2-20 avhengig av bruk

---

**Hovedpoenget:** AI-en gjør det tunge arbeidet, du fokuserer på det viktige! 🚀
```

Denne dokumentasjonen forklarer hele workflowen på en enkel måte, uten teknisk jargon. Den viser:

1. **Hva systemet gjør** - AI lager skiftplaner automatisk
2. **Hvordan det fungerer** - Steg for steg workflow
3. **Teknisk arkitektur** - Enkelt forklart
4. **Fordeler og ulemper** - Hvorfor ChatGPT er bedre
5. **Hva som kan gå galt** - Risikoer og løsninger

Er det noe spesifikt du vil at jeg skal forklare bedre eller utdype? 🤔
