import { Module } from '@nestjs/common';
import { CoursePartService } from './course-part.service';
import { CoursePartController } from './course-part.controller';

@Module({
  controllers: [CoursePartController],
  providers: [CoursePartService]
})
export class CoursePartModule {}
