import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const users = await this.userRepository.find()
    console.log(users)
    return true;
  }
}
