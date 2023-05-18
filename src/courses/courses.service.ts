import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from 'src/entities/course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(uuid: string) {
    return this.courseRepository.findOne({ where: {uuid: uuid}});
  }

  async update(uuid: string, updateCourseDto: UpdateCourseDto) {
    await this.courseRepository.update(uuid, updateCourseDto);
    return this.findOne(uuid);
  }

  remove(uuid: string) {
    return this.courseRepository.softDelete(uuid);
  }
}
