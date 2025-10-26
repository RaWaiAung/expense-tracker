import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      // override default from
      from: '"Onbaording Team" <support@nestjs-blog.com>',
      subject: 'Welcome to NestJs Blog',
      // `.ejs` extension is appended automatically to template
      template: './welcome',
      // Context is available in email template
      context: {
        name: user.fullName,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
