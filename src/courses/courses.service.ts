import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from '../entities/course.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseJob } from '../entities/course-job.entity';
import MeiliSearch from 'meilisearch';
import { PurchaseService } from '../purchase/purchase.service';
import { User } from '../entities/user.entity';

@Injectable()
export class CoursesService {

  client: MeiliSearch;

  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(CourseJob) private courseJobRepository: Repository<CourseJob>,
    private readonly purchaseService: PurchaseService
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

  async getCourse(uuid: string, user: User) {
    const purchase = await this.purchaseService.findUserCoursePurchase(uuid, user);

    let course = await this.courseRepository.findOne({where: {uuid: uuid}, relations: ['user']})

    const owned = !!purchase || course.user.uuid === user.uuid;

    if (!owned) {
      course = await this.findOnePreview(uuid);
    } else {
      course = await this.findOneComplete(uuid, user.uuid);
    }

    return {
      ...course,
      owned: owned
    }
  }

  async findOneComplete(uuid: string, userUuid?: string) {
    const qb = this.courseRepository.createQueryBuilder('course')
    .leftJoinAndSelect('course.courseParts', 'courseParts')
    .leftJoinAndSelect('courseParts.courseChapters', 'courseChapters')
    if (userUuid) qb.leftJoinAndSelect('courseChapters.userChapterCompletions', 'userChapterCompletions', 'userChapterCompletions.userUuid = :userUuid', {userUuid: userUuid})
    qb.leftJoinAndSelect('course.courseJobs', 'courseJobs')
    .leftJoinAndSelect('courseJobs.job', 'job')
    .leftJoinAndSelect('course.thumbnail', 'thumbnail')
    .leftJoinAndSelect('course.video', 'video')
    .leftJoinAndSelect('courseChapters.documents', 'courseDocuments')
    .leftJoinAndSelect('courseChapters.video', 'courseVideo')
    .where('course.uuid = :uuid', {uuid: uuid})
    .orderBy('courseParts.createdAt', 'ASC')
    .addOrderBy('courseChapters.createdAt', 'ASC')
    return await qb.getOne();
  }

  async findOnePreview(uuid: string) {
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
      relations: ['courseJobs', 'courseJobs.job', 'courseParts', 'courseParts.courseChapters', 'thumbnail', 'video']
    });
    course.courseParts.forEach(part => {
      part.courseChapters.forEach(chapter => {
        chapter.description = undefined;
      })
    })
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
    const updatedCourse = await this.findOneComplete(uuid);

    await this.client.index('course').updateDocuments([{uuid, ...updateCourseDto, thumbnail: updatedCourse.thumbnail?.url}])
    return updatedCourse;
  }

  async remove(uuid: string) {
    await this.client.index('course').deleteDocument(uuid)
    return this.courseRepository.softDelete(uuid);
  }
}
