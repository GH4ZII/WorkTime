export declare class UpdateShiftDto {
    startTime?: string;
    endTime?: string;
    location?: string;
    notes?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}
