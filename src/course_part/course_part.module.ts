import { Module } from '@nestjs/common';
import { CoursePartService } from './course_part.service';
import { CoursePartController } from './course_part.controller';

@Module({
  controllers: [CoursePartController],
  providers: [CoursePartService]
})
export class CoursePartModule {}
