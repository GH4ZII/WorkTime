"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendPasswordResetEmail(to, name, resetUrl) {
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #5a6fd8 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">WorkTime</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Tilbakestill passord</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">Hei ${name || ''}!</h2>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Du har bedt om å tilbakestille passordet ditt for WorkTime-kontoen din. 
            Klikk på knappen under for å velge et nytt passord:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #667eea; color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              Tilbakestill passord
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            <strong>Viktig:</strong> Denne lenken utløper om 1 time av sikkerhetshensyn. 
            Hvis du ikke ba om denne e-posten, kan du trygt ignorere den.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px;">
            Hvis knappen ikke fungerer, kan du kopiere og lime inn denne lenken i nettleseren:<br>
            <span style="word-break: break-all; color: #667eea;">${resetUrl}</span>
          </p>
        </div>
      </div>
    `;
        const text = `
Hei ${name || ''}!

Du har bedt om å tilbakestille passordet ditt for WorkTime-kontoen din.

Klikk på denne lenken for å velge et nytt passord:
${resetUrl}

Denne lenken utløper om 1 time.

Hvis du ikke ba om denne e-posten, kan du trygt ignorere den.

Med vennlig hilsen,
WorkTime-teamet
    `;
        try {
            const info = await this.transporter.sendMail({
                from: process.env.MAIL_FROM || 'WorkTime <no-reply@worktime.no>',
                to,
                subject: 'Tilbakestill passord - WorkTime',
                text,
                html,
            });
            console.log('Password reset email sent:', info.messageId);
            return { success: true, messageId: info.messageId };
        }
        catch (error) {
            console.error('Failed to send password reset email:', error);
            throw new Error('Kunne ikke sende e-post for tilbakestilling av passord');
        }
    }
    async verifyConnection() {
        try {
            await this.transporter.verify();
            console.log('SMTP connection verified successfully');
            return true;
        }
        catch (error) {
            console.error('SMTP connection failed:', error);
            return false;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map