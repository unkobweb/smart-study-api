import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {

  static templates = {
    "test": {subject: "Test", path: "./confirmation"}
  }

  constructor(private mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, templateName: string, context: any = {}) {
    console.log("Sending email to " + to + " with subject " + subject + " and template " + templateName)
    const info = await this.mailerService.sendMail({
      to: to,
      subject: subject,
      template: EmailService.templates[templateName].path,
      context: context
    })
    console.log(info)
  }

}