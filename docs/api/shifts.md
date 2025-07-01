
En oversikt over **Shift API**-endepunktene i WorkTime-prosjektet.
------------------------------
## 📋 Endepunkter

| Metode     | Path          | Beskrivelse        | Body / Params                       | Response                            |
| ---------- | ------------- | ------------------ | ----------------------------------- | ----------------------------------- |
| **POST**   | `/shifts`     | Opprett nytt skift | JSON (CreateShiftDto)               | **201** Created, JSON av nytt shift |
| **GET**    | `/shifts`     | Hent alle skift    | —                                   | **200** OK, array av shifts         |
| **GET**    | `/shifts/:id` | Hent skift med ID  | `:id` i URL                         | **200** OK, JSON av shift           |
| **PUT**    | `/shifts/:id` | Oppdater skift     | `:id` i URL + JSON (UpdateShiftDto) | **200** OK, JSON av oppdatert shift |
| **DELETE** | `/shifts/:id` | Slett skift        | `:id` i URL                         | **204** No Content                  |

## 📐 DTO-er

### CreateShiftDto

* `userId` (string)      – ID til den ansatte skiftet tildeles
* `startTime` (string)   – ISO 8601-dato/tid, f.eks. "2025-07-01T08:00:00Z"
* `endTime` (string)     – ISO 8601-dato/tid
* `location?` (string)   – Valgfri, sted/beskrivelse
* `notes?` (string)      – Valgfri, notater
* `createdBy` (string)   – ID til den som oppretter skiftet (bruker eller admin)

### UpdateShiftDto

* `startTime?` (string)
* `endTime?` (string)
* `location?` (string)
* `notes?` (string)
* `status?` ("PENDING" | "APPROVED" | "REJECTED")

## ⚙️ Eksempler

### 1. Opprett skift

```bash
curl -X POST http://localhost:3001/shifts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "2",
    "startTime": "2025-07-01T08:00:00Z",
    "endTime": "2025-07-01T16:00:00Z",
    "createdBy": "1"
  }'
```

*Svar:* **201 Created** + JSON med det nye skiftet

### 2. Hent alle skift

```bash
curl http://localhost:3001/shifts
```

*Svar:* **200 OK**

```json
[
  { "id": "...", "userId": "2", "startTime": "...", ... },
  { ... }
]
```

### 3. Oppdater skift

```bash
curl -X PUT http://localhost:3001/shifts/<shift-id> \
  -H "Content-Type: application/json" \
  -d '{ "status": "APPROVED" }'
```

### 4. Slett skift

```bash
curl -X DELETE http://localhost:3001/shifts/<shift-id>
```

## 📈 Statuskoder

* **201 Created** – Skifte ble opprettet
* **200 OK**      – Henting/oppdatering var vellykket
* **204 No Content** – Sletting var vellykket
* **400 Bad Request** – Ugyldig data eller mangler felt
* **404 Not Found**  – Ingen ressurs funnet med gitt ID

## 🔒 Autentisering

* Alle `/shifts`-endepunkter krever en gyldig **JWT** i `Authorization: Bearer <token>`-header.
* Kun brukere med rolle `ADMIN` kan opprette, oppdatere og slette skift.
* `EMPLOYEE` kan kun hente (`GET /shifts` og `GET /shifts/:id`) egne skift.

---

*Dokumentasjon generert av WorkTime CLI*
