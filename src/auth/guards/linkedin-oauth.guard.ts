import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedInOAuthGuard extends AuthGuard('linkedin') {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}