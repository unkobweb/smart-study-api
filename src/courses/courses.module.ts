import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from '../entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseJob } from '../entities/course-job.entity';
import { PurchaseModule } from '../purchase/purchase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseJob]), PurchaseModule],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
