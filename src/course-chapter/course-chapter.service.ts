import { Injectable } from '@nestjs/common';
import { CreateCourseChapterDto } from './dto/create-course-chapter.dto';
import { UpdateCourseChapterDto } from './dto/update-course-chapter.dto';

@Injectable()
export class CourseChapterService {
  create(createCourseChapterDto: CreateCourseChapterDto) {
    return 'This action adds a new courseChapter';
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
