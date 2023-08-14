import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CourseChapterService } from './course-chapter.service';
import { CreateCourseChapterDto } from './dto/create-course-chapter.dto';
import { UpdateCourseChapterDto } from './dto/update-course-chapter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCourseChapterGuard } from './guards/create-course-chapter.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/upload-image.dto';
import { MediaService } from 'src/media/media.service';

@Controller('course-chapter')
export class CourseChapterController {
  constructor(
    private readonly courseChapterService: CourseChapterService, 
    private readonly mediaService: MediaService
  ) { }

  @UseGuards(JwtAuthGuard, CreateCourseChapterGuard)
  @Post()
  create(@Body() createCourseChapterDto: CreateCourseChapterDto, @Req() req) {
    createCourseChapterDto["user"] = req.user;
    return this.courseChapterService.create(createCourseChapterDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: UploadImageDto) {
    return this.courseChapterService.uploadImage(file, dto.courseChapter);
  }

  @Get()
  findAll() {
    return this.courseChapterService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.courseChapterService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateCourseChapterDto: UpdateCourseChapterDto) {
    return this.courseChapterService.update(uuid, updateCourseChapterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.courseChapterService.remove(uuid);
  }
}


// @UseGuards(JwtAuthGuard)
// @Post()
// create(@Body() createCourseDto: CreateCourseDto, @Req() req) {
//   createCourseDto["user"] = req.user
//   return this.coursesService.create(createCourseDto);
// }

// @UseGuards(JwtAuthGuard)
// @Get('me')
// findAll(@Req() req) {
//   return this.coursesService.findAll({
//     where: {
//       user: { uuid: req.user.uuid }
//     },
//     relations: ['user']
//   });
// }

// @Get(':uuid')
// findOne(@Param('uuid') uuid: string) {
//   return this.coursesService.findOne(uuid);
// }

// @UseGuards(JwtAuthGuard, UpdateCourseGuard)
// @Patch(':uuid')
// update(@Param('uuid') uuid: string, @Body() updateCourseDto: UpdateCourseDto) {
//   return this.coursesService.update(uuid, updateCourseDto);
// }

// @UseGuards(JwtAuthGuard, UpdateCourseGuard)
// @Delete(':uuid')
// remove(@Param('uuid') uuid: string, @Body() updateCourseDto: UpdateCourseDto) {
//   return this.coursesService.remove(uuid);
// }