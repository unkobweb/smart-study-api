import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from 'src/entities/course.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll(opts?: FindManyOptions) {
    return this.courseRepository.find(opts);
  }

  async findOne(uuid: string) {
    const course = await this.courseRepository.findOne({ 
      where: {uuid: uuid},
      relations: ['courseParts', 'courseParts.courseChapters', 'courseParts.courseChapters.documents','courseParts.courseChapters.video','thumbnail']
    });
    return course;
  }

  async update(uuid: string, updateCourseDto: UpdateCourseDto) {
    await this.courseRepository.update(uuid, updateCourseDto);
    return this.findOne(uuid);
  }

  remove(uuid: string) {
    return this.courseRepository.softDelete(uuid);
  }
}
