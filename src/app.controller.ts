import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly emailService: EmailService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('email')
  // sendMailTest() {
  //   return this.emailService.sendEmail("sieg.alexandre@gmail.com", "Houston, we have a problem", "test", {name: "Alex", url: "https://www.google.com"})
  // }
}
