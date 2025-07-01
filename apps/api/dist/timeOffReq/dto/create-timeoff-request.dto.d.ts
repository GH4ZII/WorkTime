export declare class CreateTimeOffRequestDto {
    userId: string;
    fromDate: string;
    toDate: string;
    type: 'VACATION' | 'SICK' | 'OTHER';
    reason?: string;
}
