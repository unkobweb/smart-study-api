import { Injectable } from '@nestjs/common';
import { CreateCoursePartDto } from './dto/create-course-part.dto';
import { UpdateCoursePartDto } from './dto/update-course-part.dto';

@Injectable()
export class CoursePartService {
  create(createCoursePartDto: CreateCoursePartDto) {
    return 'This action adds a new coursePart';
  }

  findAll() {
    return `This action returns all coursePart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coursePart`;
  }

  update(id: number, updateCoursePartDto: UpdateCoursePartDto) {
    return `This action updates a #${id} coursePart`;
  }

  remove(id: number) {
    return `This action removes a #${id} coursePart`;
  }
}
