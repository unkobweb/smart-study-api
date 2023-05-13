import { Controller, Get, Request, Post, UseGuards, Body, Response } from '@nestjs/common';
import { AuthService, TokenObject } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { LinkedInOAuthGuard } from './guards/linkedin-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto
  ) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto
  ) {
    return this.authService.credentialLogin(dto);
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @Request() req,
    @Response() res
  ) {
    const tokenObj: TokenObject = await this.authService.googleLogin(req);
    return res.redirect('http://localhost:3000/login/callback?token=' + tokenObj.access_token)
  }

  @Get('linkedin')
  @UseGuards(LinkedInOAuthGuard)
  async linkedInAuth(@Request() req) {}

  @Get('linkedin-redirect')
  @UseGuards(LinkedInOAuthGuard)
  async linkedInAuthRedirect(
    @Request() req,
    @Response() res
  ) {
    const tokenObj: TokenObject = await this.authService.linkedInLogin(req);
    return res.redirect('http://localhost:3000/login/callback?token=' + tokenObj.access_token)
  }

}
