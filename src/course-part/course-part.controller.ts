import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CoursePartService } from './course-part.service';
import { CreateCoursePartDto } from './dto/create-course-part.dto';
import { UpdateCoursePartDto } from './dto/update-course-part.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCoursePartGuard } from './guards/create-course-part.guard';
import { UserOwnCoursePart } from './guards/user-own-course-part.guard';

@Controller('course-part')
export class CoursePartController {
  constructor(private readonly coursePartService: CoursePartService) {}

  @UseGuards(JwtAuthGuard, CreateCoursePartGuard)
  @Post()
  create(@Body() createCoursePartDto: CreateCoursePartDto, @Req() req) {
    createCoursePartDto["user"] = req.user;
    return this.coursePartService.create(createCoursePartDto);
  }

  @Get()
  findAll() {
    return this.coursePartService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.coursePartService.findOne(uuid);
  }

  @UseGuards(JwtAuthGuard, UserOwnCoursePart)
  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateCoursePartDto: UpdateCoursePartDto) {
    return this.coursePartService.update(uuid, updateCoursePartDto);
  }

  @UseGuards(JwtAuthGuard, UserOwnCoursePart)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.coursePartService.remove(uuid);
  }
}
