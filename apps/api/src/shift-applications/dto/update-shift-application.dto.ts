export class UpdateShiftApplicationDto {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  message?: string;
}
