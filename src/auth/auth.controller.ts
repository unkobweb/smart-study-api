import { Controller, Get, Request, Post, UseGuards, Body, Response, UnauthorizedException } from '@nestjs/common';
import { AuthService, TokenObject } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { LinkedInOAuthGuard } from './guards/linkedin-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';

const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('2fa/setup')
  async setup2FA(@Request() req) {
    return this.authService.setup2FA(req.user.uuid);
  }

  // Only used for the first setup of 2FA
  @UseGuards(JwtAuthGuard)
  @Post('2fa/setup/verify')
  async verify2FASetup(@Request() req, @Body() dto: { token: string }) {
    return this.authService.verify2FASetup(req.user.uuid, dto.token);
  }

  @Post('2fa/verify')
  async verify2FA(@Request() req, @Body() dto: { jwt: string, token: string }) {
    let decoded;
    try {
      decoded = jwt.verify(dto.jwt, process.env.JWT_2FA_SECRET)
    } catch (error) {
      throw new UnauthorizedException("Invalid 2FA JWT")
    }
    return this.authService.verify2FA(decoded.userUuid, dto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.uuid);
  }

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
    const tokenObj = await this.authService.googleLogin(req);
    if (tokenObj.type == '2fa') {
      return res.redirect(`${WEB_URL}/login/callback?mfatoken=` + tokenObj.token)
    } else {
      return res.redirect(`${WEB_URL}/login/callback?token=` + tokenObj.token)
    }
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
    if (tokenObj.type == '2fa') {
      return res.redirect(`${WEB_URL}/login/callback?mfatoken=` + tokenObj.token)
    } else {
      return res.redirect(`${WEB_URL}/login/callback?token=` + tokenObj.token)
    }
  }

}
