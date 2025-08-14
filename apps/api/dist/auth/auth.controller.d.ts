import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    getProfile(req: any): Promise<any>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
