export declare class UpdateShiftSwapRequestDto {
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    swapWithId?: string;
    toShiftId?: string;
    reason?: string;
}
