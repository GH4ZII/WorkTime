🧱 1. Datamodell og Backend (API først!)
🟢 Hvorfor først? Alt frontend og design trenger dataene herfra.

✅ Gjør dette:

Lag en plan for hvilke data du trenger:

User, Shift, RequestForLeave, WorkLog, Admin

Lag modellen i apps/api

Bruk Prisma eller Drizzle med SQLite/Postgres

Lag API-ruter:

GET /shifts, POST /shift, PUT /shift/:id, osv.

Sett opp auth (for admin/ansatt)

Kjør backend lokalt og test med Postman

🎨 2. Design og UI-prototyping
🟢 Hvorfor nå? Det hjelper deg tenke brukerflyt og hvilke skjermer som trengs.

✅ Gjør dette:

Bruk Figma (eller papir!) til å tegne:

Logg inn-skjerm

Dashboard (for admin og ansatt)

Kalender-visning

Skift-detaljer og godkjenning

Del opp skjermene i komponenter:

Header, knapper, kort, kalender osv.

📱 3. Frontend: Mobilapp (Expo)
✅ Start med apps/mobile:

Koble til API-et (axios/fetch)

Bygg innloggingsskjerm

Lag dashboard-skjerm for ansatte

Vis dagens skift og arbeidstimer

Lag skjerm for å søke om fri

Gjenbruk packages/ui for knapper osv.

🖥️ 4. Adminpanel (Web/Next.js)
✅ Start med apps/web:

Innlogging (admin)

Admin-dashboard

Liste over ansatte og skift

Rediger skift, flytt skift, legg til nye

Statistikk over timer og fravær

📦 5. Shared UI-komponenter (packages/ui)
✅ Eksempler:

Button, Card, Calendar, Modal, TextInput

Bruk samme komponenter i web og mobil

📚 6. Dokumentasjon (docs/)
✅ Når du jobber med det tekniske:

Skriv docs/architecture.md med diagrammer

Forklar API-ruter i docs/api.md

Lag docs/usage.md for hvordan man bruker prosjektet

🛡️ 7. Auth og Rollehåndtering
Admin og ansatte har forskjellig tilgang

JWT eller session tokens

Middleware som beskytter ruter

🚀 8. Testing og Deployment
Test API med Postman

Test appen på Expo Go

Deploy backend til Vercel/Azure

Deploy mobilapp til Android/iOS

✨ Ekstra tips:
Lag testdata (f.eks. 3 ansatte, 5 skift)

Jobb først med én flyt: f.eks. ansatte som ser neste skift

Når du får én flyt til å funke, legg på mer
