import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseChapterDto } from './create-course-chapter.dto';

export class UpdateCourseChapterDto extends PartialType(CreateCourseChapterDto) {}
