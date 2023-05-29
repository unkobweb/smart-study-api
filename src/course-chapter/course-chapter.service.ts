import { Injectable } from '@nestjs/common';
import { CreateCourseChapterDto } from './dto/create-course-chapter.dto';
import { UpdateCourseChapterDto } from './dto/update-course-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseChapter } from 'src/entities/course-chapter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseChapterService {
  constructor(
    @InjectRepository(CourseChapter) private courseChapterRepository: Repository<CourseChapter>,
  ) { }

  async create(createCourseChapterDto: CreateCourseChapterDto) {
    return this.courseChapterRepository.save(createCourseChapterDto);
  }

  findAll() {
    return `This action returns all courseChapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseChapter`;
  }

  update(id: number, updateCourseChapterDto: UpdateCourseChapterDto) {
    return `This action updates a #${id} courseChapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseChapter`;
  }
}
