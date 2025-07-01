export class CreateUserDto {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: 'USER' | 'ADMIN'; // Brukerens rolle, enten 'USER' eller 'ADMIN'
}
