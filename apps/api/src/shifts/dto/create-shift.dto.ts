
export class CreateShiftDto {
    userId: string;      // Hvem skal ha skiftet
    startTime: string;   // Når skiftet begynner (ISO-format)
    endTime: string;     // Når skiftet slutter
    location?: string;   // Valgfritt: hvor er skiftet
    notes?: string;      // Valgfritt: ekstra notater
    createdBy: string; // Hvem opprettet skiftet
}
