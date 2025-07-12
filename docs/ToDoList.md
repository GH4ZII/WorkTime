Implementere alle disse API-kallene.

```python

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
