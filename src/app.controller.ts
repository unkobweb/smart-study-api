import { Controller, Get, Request, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TestGuard } from './users/test.guard';
import { FileInterceptor } from '@nestjs/platform-express';
// import { EmailService } from './email/email.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    // private readonly emailService: EmailService,
  ) { }

  @UseGuards(TestGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('email')
  // sendMailTest() {
  //   return this.emailService.sendEmail("sieg.alexandre@gmail.com", "Houston, we have a problem", "test", {name: "Alex", url: "https://www.google.com"})
  // }
}
