import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursePartService } from './course-part.service';
import { CreateCoursePartDto } from './dto/create-course-part.dto';
import { UpdateCoursePartDto } from './dto/update-course-part.dto';

@Controller('course-part')
export class CoursePartController {
  constructor(private readonly coursePartService: CoursePartService) {}

  @Post()
  create(@Body() createCoursePartDto: CreateCoursePartDto) {
    return this.coursePartService.create(createCoursePartDto);
  }

  @Get()
  findAll() {
    return this.coursePartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursePartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoursePartDto: UpdateCoursePartDto) {
    return this.coursePartService.update(+id, updateCoursePartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursePartService.remove(+id);
  }
}
