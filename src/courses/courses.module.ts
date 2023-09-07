import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseJob } from '../entities/course-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseJob])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
