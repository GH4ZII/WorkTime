export declare class MailService {
    private transporter;
    constructor();
    sendPasswordResetEmail(to: string, name: string, resetUrl: string): Promise<{
        success: boolean;
        messageId: any;
    }>;
    verifyConnection(): Promise<boolean>;
}
