import { Injectable } from '@nestjs/common';
import { CreateCourseChapterDto } from './dto/create-course-chapter.dto';
import { UpdateCourseChapterDto } from './dto/update-course-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseChapter } from 'src/entities/course-chapter.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class CourseChapterService {
  constructor(
    private readonly mediaService: MediaService,
    @InjectRepository(CourseChapter) private courseChapterRepository: Repository<CourseChapter>,
  ) { }

  async create(createCourseChapterDto: CreateCourseChapterDto) {
    return this.courseChapterRepository.save(createCourseChapterDto);
  }

  findAll(opts?: FindManyOptions) {
    return this.courseChapterRepository.find(opts);
  }

  async findOne(uuid: string) {
    return this.courseChapterRepository.findOne({ where: { uuid: uuid } });
  }

  async update(uuid: string, updateCourseChapterDto: UpdateCourseChapterDto) {
    console.log('UpdateCourseChapterDto : ', updateCourseChapterDto)
    await this.courseChapterRepository.update(uuid, updateCourseChapterDto);
    return this.findOne(uuid);
  }

  remove(uuid: string) {
    return this.courseChapterRepository.softDelete(uuid);
  }

  async uploadImage(file: Express.Multer.File, courseChapter: CourseChapter) {
    console.log('File : ', file)
    courseChapter = await this.courseChapterRepository.findOne({ where: { uuid: courseChapter.uuid }, relations: ['coursePart', 'coursePart.course', 'coursePart.course.user'] })
    return this.mediaService.uploadFile(file, `${courseChapter.coursePart.course.user.uuid}/${courseChapter.coursePart.course.uuid}/${courseChapter.coursePart.uuid}/${courseChapter.uuid}`)
  }
}
