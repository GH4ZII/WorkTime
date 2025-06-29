export class UpdateShiftDto {
    startTime?: string;  // Når skiftet begynner (ISO-format)
    endTime?: string;    // Når skiftet slutter
    location?: string;   // Valgfritt: hvor er skiftet
    notes?: string;      // Valgfritt: ekstra notater
    status?: 'PENDING' | 'APPROVED' | 'REJECTED'; // Status for skiftet
}
