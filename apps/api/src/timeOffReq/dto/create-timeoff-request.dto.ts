export class CreateTimeOffRequestDto {
    userId: string;           // Hvem ber om fri
    fromDate: string;         // Startdato, ISO-string
    toDate: string;           // Sluttdato, ISO-string
    type: 'VACATION' | 'SICK' | 'OTHER';
    reason?: string;          // Valgfritt: årsak til fridagen
}
