import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(email);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const payload = { email: user.email, sub: user.uuid };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    async register(dto: RegisterDto) {
      return this.usersService.create(dto);
    }
}
