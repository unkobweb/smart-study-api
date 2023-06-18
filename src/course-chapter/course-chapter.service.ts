import { Injectable } from '@nestjs/common';
import { CreateCourseChapterDto } from './dto/create-course-chapter.dto';
import { UpdateCourseChapterDto } from './dto/update-course-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseChapter } from 'src/entities/course-chapter.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CourseChapterService {
  constructor(
    @InjectRepository(CourseChapter) private courseChapterRepository: Repository<CourseChapter>,
  ) { }

  async create(createCourseChapterDto: CreateCourseChapterDto) {
    return this.courseChapterRepository.save(createCourseChapterDto);
  }

  findAll(opts?: FindManyOptions) {
    return this.courseChapterRepository.find(opts);
  }

  async findOne(uuid: string) {
    return this.courseChapterRepository.findOne({ where: {uuid: uuid}});
  }

  async update(uuid: string, updateCourseChapterDto: UpdateCourseChapterDto) {
    await this.courseChapterRepository.update(uuid, updateCourseChapterDto);
    return this.findOne(uuid);
  }

  remove(uuid: string) {
    return this.courseChapterRepository.softDelete(uuid);
  }
}
