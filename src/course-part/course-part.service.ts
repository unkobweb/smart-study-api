import { Injectable } from '@nestjs/common';
import { CreateCoursePartDto } from './dto/create-course-part.dto';
import { UpdateCoursePartDto } from './dto/update-course-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursePart } from '../entities/course-part.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursePartService {
  constructor(
    @InjectRepository(CoursePart) private coursePartRepository: Repository<CoursePart>,
  ) { }

  async create(createCoursePartDto: CreateCoursePartDto) {
    return this.coursePartRepository.save(createCoursePartDto);
  }

  findAll() {
    return this.coursePartRepository.find()
  }

  findOne(uuid: string) {
    return this.coursePartRepository.findOne({ where: { uuid: uuid } });;
  }

  async update(uuid: string, updateCoursePartDto: UpdateCoursePartDto) {
    await this.coursePartRepository.update(uuid, updateCoursePartDto);
    return this.findOne(uuid);
  }

  remove(uuid: string) {
    return this.coursePartRepository.softDelete(uuid);
  }
}
