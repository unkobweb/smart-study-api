import { Module } from '@nestjs/common';
import { CourseChapterService } from './course-chapter.service';
import { CourseChapterController } from './course-chapter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePart } from '../entities/course-part.entity';
import { CourseChapter } from '../entities/course-chapter.entity';
import { MediaModule } from '../media/media.module';
import { UserChapterCompletion } from '../entities/user-chapter-completion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursePart, CourseChapter, UserChapterCompletion]), MediaModule],
  controllers: [CourseChapterController],
  providers: [CourseChapterService]
})
export class CourseChapterModule {}
