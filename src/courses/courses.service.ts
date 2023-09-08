import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from 'src/entities/course.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseJob } from '../entities/course-job.entity';
import MeiliSearch from 'meilisearch';

@Injectable()
export class CoursesService {

  client: MeiliSearch;

  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(CourseJob) private courseJobRepository: Repository<CourseJob>
  ) {
    this.client = new MeiliSearch({ host: process.env.MEILISEARCH_HOST, apiKey: process.env.MEILISEARCH_MASTER_KEY})
  }

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.courseRepository.save(createCourseDto);
    await this.client.index('course').addDocuments([{...course, thumbnail: null}])
    return course
  }

  findAll(opts?: FindManyOptions) {
    return this.courseRepository.find(opts);
  }

  async findOne(uuid: string, preview?: boolean) {
    const relations = ['courseJobs', 'courseJobs.job', 'courseParts', 'courseParts.courseChapters', 'thumbnail', 'video']
    if (!preview) {
      relations.push('courseParts.courseChapters.documents','courseParts.courseChapters.video')
    }
    // if preview, omit the courseChapter.description
    const course = await this.courseRepository.findOne({ 
      where: {uuid: uuid},
      order: {
        courseParts: {
          createdAt: 'ASC',
          courseChapters: {
            createdAt: 'ASC'
          }
        },
      },
      relations: relations
    });
    if (preview) {
      course.courseParts.forEach(part => {
        part.courseChapters.forEach(chapter => {
          chapter.description = undefined;
        })
      })
    }
    return course;
  }

  async update(uuid: string, updateCourseDto: UpdateCourseDto) {
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
    const updatedCourse = await this.findOne(uuid);

    await this.client.index('course').updateDocuments([{uuid, ...updateCourseDto, thumbnail: updatedCourse.thumbnail?.url}])
    return updatedCourse;
  }

  async remove(uuid: string) {
    await this.client.index('course').deleteDocument(uuid)
    return this.courseRepository.softDelete(uuid);
  }
}
