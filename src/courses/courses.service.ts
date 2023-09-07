import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from 'src/entities/course.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseJob } from '../entities/course-job.entity';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(CourseJob) private courseJobRepository: Repository<CourseJob>
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
      relations: ['courseJobs', 'courseJobs.job', 'courseParts', 'courseParts.courseChapters', 'courseParts.courseChapters.documents','courseParts.courseChapters.video','thumbnail']
    });
    return course;
  }

  async update(uuid: string, updateCourseDto: UpdateCourseDto) {
    console.log(updateCourseDto)
    if (updateCourseDto.jobs) {
      await this.courseJobRepository.delete({course: {uuid: uuid}});
      for (const job of updateCourseDto.jobs) {
        await this.courseJobRepository.save({
          course: {uuid: uuid},
          job: {uuid: job}
        });
      }
      delete updateCourseDto.jobs;
    }
    await this.courseRepository.update(uuid, updateCourseDto);
    return this.findOne(uuid);
  }

  remove(uuid: string) {
    return this.courseRepository.softDelete(uuid);
  }
}
