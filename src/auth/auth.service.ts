import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    if(dto.password !== dto.confirmPassword){
      throw new BadRequestException(["confirmPassword must be the same as password"])
    }
    delete dto.confirmPassword;
    const user = await this.usersService.findOne(dto.email);
    if(user != null){
      throw new BadRequestException(["email already exist"])
    }
    const newUser = await this.usersService.create(dto);
    return this.login(newUser);
  }

  async googleLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    return this.login(user);
  }

  async linkedInLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    return this.login(user);
  }
}
