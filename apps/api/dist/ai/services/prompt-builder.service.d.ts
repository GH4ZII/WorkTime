export interface Employee {
    id: string;
    name: string;
    role: string;
    preferredShifts?: string[];
    positionPercentage: number;
}
export interface TimeOffRequest {
    employeeId: string;
    startDate: Date;
    endDate: Date;
    type: 'VACATION' | 'SICK_LEAVE' | 'PERSONAL_LEAVE' | 'MATERNITY_LEAVE';
    status: 'APPROVED' | 'PENDING' | 'REJECTED';
}
export interface ShiftConstraint {
    name: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}
export declare class PromptBuilder {
    buildWeeklySchedulePrompt(employees: Employee[], timeOffRequests: TimeOffRequest[], weekStart: Date, weekEnd: Date): string;
    buildMonthlySchedulePrompt(employees: Employee[], timeOffRequests: TimeOffRequest[], month: Date, constraints: ShiftConstraint[]): string;
    private formatEmployeesWithPosition;
    private formatTimeOffRequests;
    private formatConstraints;
    private getEmployeeName;
    private translateTimeOffType;
}
