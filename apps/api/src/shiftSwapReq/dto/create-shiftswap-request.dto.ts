export class CreateShiftSwapRequestDto {
    userId: string; // Hvem ber om bytte
    fromShiftId: string; // ID for skiftet som skal byttes bort
    type: 'GIVE_AWAY' | 'SWAP';
    swapWithId?: string; // ID for brukeren som skal bytte med, hvis type er 'SWAP'
    toShiftId?: string; // ID for skiftet som skal byttes til, hvis type er 'SWAP'
    reason?: string; // Valgfritt: årsak til byttet
}
