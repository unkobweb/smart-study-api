import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        secure: false,
        port: +process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      },
      defaults: {
        from: `"Smart Study" <${process.env.EMAIL_USER}>`,
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}