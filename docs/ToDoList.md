Implementere alle disse API-kallene.

```python

3. TimeOffRequest (ferie, sykdom osv)
GET /timeoff-requests – Hent alle søknader

GET /timeoff-requests/:id – Hent én søknad

POST /timeoff-requests – Send inn søknad

PUT /timeoff-requests/:id – Oppdater søknad/status

DELETE /timeoff-requests/:id – Slett søknad

4. ShiftSwapRequest (bytte skift)
GET /shift-swap-requests

GET /shift-swap-requests/:id

POST /shift-swap-requests – Opprett forespørsel om bytte

PUT /shift-swap-requests/:id – Oppdater status, eller godkjenn/avslå

DELETE /shift-swap-requests/:id

5. WorkLog (timelister/loggføring av arbeid)
GET /worklogs

GET /worklogs/:id

POST /worklogs – Legg til arbeidstimelog

PUT /worklogs/:id

DELETE /worklogs/:id

6. Notification (varslinger til brukere)
GET /notifications

GET /notifications/:id

POST /notifications – Send en varsling

PUT /notifications/:id – Merk som lest/ulest, endre innhold

DELETE /notifications/:id

7. Chat (enkel Slack/Teams-løsning)
ChatRoom
GET /chatrooms

GET /chatrooms/:id

POST /chatrooms

PUT /chatrooms/:id

DELETE /chatrooms/:id

ChatMember
GET /chatmembers

POST /chatmembers – Legg til bruker i rom

DELETE /chatmembers/:id – Fjern fra rom

Message
GET /messages?roomId=...

POST /messages – Send melding
