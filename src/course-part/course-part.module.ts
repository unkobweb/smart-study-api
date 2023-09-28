import { Module } from '@nestjs/common';
import { CoursePartService } from './course-part.service';
import { CoursePartController } from './course-part.controller';
import { CoursePart } from '../entities/course-part.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursePart, Course])],
  controllers: [CoursePartController],
  providers: [CoursePartService]
})
export class CoursePartModule {}
