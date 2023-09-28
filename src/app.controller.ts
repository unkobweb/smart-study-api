import { Controller, Get, Request, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';

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

  @Get('meilisearch-key')
  getMeilisearchKey(): Promise<string> {
    return this.appService.getMeiliSearchKey();
  }

  // @Get('email')
  // sendMailTest() {
  //   return this.emailService.sendEmail("sieg.alexandre@gmail.com", "Houston, we have a problem", "test", {name: "Alex", url: "https://www.google.com"})
  // }
}
