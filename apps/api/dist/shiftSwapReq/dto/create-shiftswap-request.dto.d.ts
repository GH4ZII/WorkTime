export declare class CreateShiftSwapRequestDto {
    userId: string;
    fromShiftId: string;
    type: 'GIVE_AWAY' | 'SWAP';
    swapWithId?: string;
    toShiftId?: string;
    reason?: string;
}
