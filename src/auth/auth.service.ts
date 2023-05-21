import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from "argon2";
import * as speakeasy from 'speakeasy';
import * as jwt from 'jsonwebtoken';
export interface TokenObject {
  type: string;
  token: string;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getProfile(userUuid) {
    const user = await this.usersService.findOneByUuid(userUuid);
    const { password, secret2Fa, ...result } = user;
    return result;
  }

  async setup2FA(userUuid) {
    const user = await this.usersService.findOneByUuid(userUuid);

    if (!user.secret2Fa) {
      const secret = speakeasy.generateSecret({ length: 20 });
      user.secret2Fa = secret.base32;
      await this.usersService.update(user.uuid, user);
    }

    const qrCodeUrl = `otpauth://totp/${user.email}?secret=${user.secret2Fa}&issuer=Smart%20Study`;
    return { qrCodeUrl };
  }

  async verify2FASetup(userUuid, token) {
    const user = await this.usersService.findOneByUuid(userUuid);
    if (!user.secret2Fa) {
      throw new BadRequestException(["2FA is not setup"])
    }
    const verified = speakeasy.totp.verify({
      secret: user.secret2Fa,
      encoding: 'base32',
      token: token,
      window: 2
    });
    if (!verified) {
      throw new BadRequestException(["invalid 2FA token"])
    }
    user.enabled2Fa = true;
    await this.usersService.update(user.uuid, user);
    return { enabled2Fa: true }
  }

  async verify2FA(userUuid, token) {
    const user = await this.usersService.findOneByUuid(userUuid);
    if (!user.secret2Fa || !user.enabled2Fa) {
      throw new BadRequestException(["2FA is not setup"])
    }
    const verified = speakeasy.totp.verify({
      secret: user.secret2Fa,
      encoding: 'base32',
      token: token,
      window: 2
    });
    if (!verified) {
      throw new BadRequestException(["invalid 2FA token"])
    }
    return this.generateJwtToken(user);
  }

  async generate2faToken(user: any): Promise<TokenObject> {
    return {
      type: '2fa',
      token: jwt.sign({ userUuid: user.uuid, type: '2fa-verification' }, process.env.JWT_2FA_SECRET, { expiresIn: '5m' }),
    }
  }

  // if user have 2fa, generate weak token for 2fa, if not, generate directly strong jwt token
  async generateUserToken(user: any): Promise<TokenObject> {
    if (user.enabled2Fa) {
      return this.generate2faToken(user);
    } else {
      return this.generateJwtToken(user);
    }
  }

  // TODO: implement login() method
  // async credentialLogin() 
  async credentialLogin(dto: LoginDto) {
    const user = await this.usersService.findOne(dto.email);
    if(user == null || user.password == null || !(await argon2.verify(user.password, dto.password))){
      throw new UnauthorizedException("invalid credentials")
    }
    return this.generateUserToken(user);
  }

  async generateJwtToken(user: any): Promise<TokenObject> {
    const payload = { ...user, password: undefined };
    return {
      type: 'access',
      token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    if(dto.password !== dto.confirmPassword){
      throw new BadRequestException(["confirmPassword must be the same as password"])
    }
    delete dto.confirmPassword;
    const user = await this.usersService.findOne(dto.email);
    if(user != null){
      throw new BadRequestException(["email already exist"])
    }
    const newUser = await this.usersService.create(dto);
    return this.generateJwtToken(newUser);
  }

  async googleLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    return this.generateUserToken(user);
  }

  async linkedInLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    return this.generateUserToken(user);
  }
}
