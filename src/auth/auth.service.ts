import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as argon2 from "argon2";
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

  // TODO: implement login() method
  // async credentialLogin() 
  async credentialLogin(dto: LoginDto) {
    const user = await this.usersService.findOne(dto.email);
    if(user == null || user.password == null || !(await argon2.verify(user.password, dto.password))){
      throw new UnauthorizedException("invalid credentials")
    }
    return this.generateJwtToken(user);
  }

  async generateJwtToken(user: any): Promise<TokenObject> {
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
    return this.generateJwtToken(newUser);
  }

  async googleLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    return this.generateJwtToken(user);
  }

  async linkedInLogin(req): Promise<TokenObject> {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    return this.generateJwtToken(user);
  }
}
