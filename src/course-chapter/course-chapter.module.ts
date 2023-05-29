import { Module } from '@nestjs/common';
import { CourseChapterService } from './course-chapter.service';
import { CourseChapterController } from './course-chapter.controller';

@Module({
  controllers: [CourseChapterController],
  providers: [CourseChapterService]
})
export class CourseChapterModule {}
