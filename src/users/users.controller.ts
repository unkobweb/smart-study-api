import { Controller, Get, Patch, UseInterceptors, UploadedFile, Body, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UsersService,
  ) {}

  @Patch(':uuid')
  async updateUser(@Param('uuid') uuid: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(uuid, dto);
  }
}
