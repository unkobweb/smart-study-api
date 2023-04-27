import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
export interface TokenObject {
  access_token: string;
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

  async login(user: any): Promise<TokenObject> {
    const payload = { ...user, password: undefined };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    return this.usersService.create(dto);
  }

  async googleLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.login(user);
  }

  async linkedInLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.login(user);
  }
}
