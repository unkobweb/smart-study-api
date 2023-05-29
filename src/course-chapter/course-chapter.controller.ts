import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CourseChapterService } from './course-chapter.service';
import { CreateCourseChapterDto } from './dto/create-course-chapter.dto';
import { UpdateCourseChapterDto } from './dto/update-course-chapter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCourseChapterGuard } from './guards/create-course-chapter.guard';

@Controller('course-chapter')
export class CourseChapterController {
  constructor(private readonly courseChapterService: CourseChapterService) {}

  @UseGuards(JwtAuthGuard, CreateCourseChapterGuard)
  @Post()
  create(@Body() createCourseChapterDto: CreateCourseChapterDto, @Req() req) {
    createCourseChapterDto["user"] = req.user;
    return this.courseChapterService.create(createCourseChapterDto);
  }

  @Get()
  findAll() {
    return this.courseChapterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseChapterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseChapterDto: UpdateCourseChapterDto) {
    return this.courseChapterService.update(+id, updateCourseChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseChapterService.remove(+id);
  }
}
