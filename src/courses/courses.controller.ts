import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateCourseGuard } from './guards/update-course.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req) {
    createCourseDto["user"] = req.user
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.coursesService.findOne(uuid);
  }

  @UseGuards(JwtAuthGuard, UpdateCourseGuard)
  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(uuid, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard, UpdateCourseGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.remove(uuid);
  }
}
