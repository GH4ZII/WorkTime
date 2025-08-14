export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: string;
  phone?: string;
  hireDate?: string;
  // ← Kun stillingsprosent, ikke maks timer
  positionPercentage?: number;
}
