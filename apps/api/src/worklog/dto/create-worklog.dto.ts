import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWorklogDto {
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @IsString()
    @IsNotEmpty()
    endTime: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    shiftId: string;

    @IsString()
    notes?: string;
}
