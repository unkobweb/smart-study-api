import { Injectable } from '@nestjs/common';
import { CreateCourseChapterDto } from './dto/create-course-chapter.dto';
import { UpdateCourseChapterDto } from './dto/update-course-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseChapter } from 'src/entities/course-chapter.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { MediaService } from 'src/media/media.service';
import { UploadMediaDto } from './dto/upload-media.dto';

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

  async uploadFile(file: Express.Multer.File, dto: UploadMediaDto) {
    const courseChapter = await this.courseChapterRepository.findOne({ where: { uuid: dto.courseChapter }, relations: ['coursePart', 'coursePart.course', 'coursePart.course.user'] })
    if (dto.isVideo) {
      const media = await this.mediaService.uploadFile(file, `${courseChapter.coursePart.course.user.uuid}/${courseChapter.coursePart.course.uuid}/${courseChapter.coursePart.uuid}/${courseChapter.uuid}`)
      courseChapter.video = media
      await this.courseChapterRepository.save(courseChapter)
      return media
    }
    return this.mediaService.uploadFile(file, `${courseChapter.coursePart.course.user.uuid}/${courseChapter.coursePart.course.uuid}/${courseChapter.coursePart.uuid}/${courseChapter.uuid}`, { courseChapter: courseChapter })
  }
}
