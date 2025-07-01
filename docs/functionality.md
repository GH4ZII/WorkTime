
Funksjonalitetsoversikt
------------------------------

Denne filen beskriver **hvilke funksjoner** som skal implementeres i WorkTime-applikasjonen, både for **administratorer** og **ansatte**. Bruk den som sjekkliste når du utvikler.

## 🎯 Felles funksjonalitet

* **Autentisering**

    * Innlogging for ansatte og admin (e-post + passord)
    * Beskytter API-endepunkter med tokens eller sesjon
* **Brukerroller**

    * Rolle `ADMIN` har ekstra rettigheter
    * Rolle `EMPLOYEE` kan kun sende forespørsler

## 👨‍💼 Ansatt­appen (Mobile)

1. **Min profil**

    * Vis navn, e-post, rolle
2. **Mine skift**

    * Liste over kommende skift med dato og klokkeslett
    * Marker fullførte skift
    * Vis detaljer for hvert skift (dato, tid, varighet, sted)
    * Mulighet for å se tidligere skift
    * Vis skiftstatus (PENDING, APPROVED, REJECTED)
    * Mulighet for å legge til notater om skift
    * Mulighet for å se kollegaer som jobber samme skift
3. **Bytte­forespørsel**

    * Velg eget skift → velg kollega og skift å bytte med
    * Send forespørsel (status: PENDING)
    * Vis historikk over alle forespørsler (PENDING, APPROVED, REJECTED)
4. **Fraværs­forespørsel**

    * Velg datointervall → angi type (VACATION, SICK, OTHER) → beskrivelse
    * Send forespørsel (status: PENDING)
    * Se status og historikk
5. **Arbeidstimer**

    * Vis totale timer jobbet per uke/måned
    * Eventuelt logg manuelle timer
6. **Notifikasjoner**

    * Push-varsler for godkjente/avviste forespørsler
    * Påminnelser om kommende skift
7. **Innstillinger**
    * Endre passord
    * Logg ut
8. **Chat med kollegaer**

    * Direktemeldinger til kollegaer
    * Se siste meldinger
    * Mulighet for gruppechat
9. **Medarbeideroversikt**

    * Se liste over kollegaer
    * Søk etter ansatte
    * Vis profil (navn, e-post, telefon)
    * Mulighet for å sende direktemelding
10. **Sanntidsoppdateringer**

    * Når admin legger til, endrer eller sletter skift, oppdateres appen automatisk
    * Chat-meldinger oppdateres i sanntid

## 🖥️ Adminportal (Web)

1. **Dashboard**

    * Oversikt over alle ansatte og kommende skift
    * Nøkkeltall: antall ansatte, skift i dag, ventende forespørsler
2. **Brukeradministrasjon**

    * Liste & søk ansatte
    * Opprett / rediger / slett brukere
3. **Shift management**

    * Opprett, endre og slette skift for ansatte
    * Velg ansatt, dato/tid, varighet
    * Vis skiftkalender
4. **Håndtering av bytte­forespørsler**

    * Liste over alle SHIFT\_SWAP\_REQUESTs
    * Godkjenn eller avvis (endre status)
5. **Håndtering av fraværs­forespørsler**

    * Liste over TIME\_OFF\_REQUESTs
    * Godkjenn eller avvis
6. **Rapporter & statistikk**

    * Timer per ansatt, per avdeling, per periode
    * Eksporter data til CSV
7. **Sanntids-push
    * Alle brukere ser umiddelbare endringer i skift, forespørsler og meldinger
    * Live chat-interface for direktemeldinger


