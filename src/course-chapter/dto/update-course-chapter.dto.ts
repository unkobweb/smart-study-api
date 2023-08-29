import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseChapterDto } from './create-course-chapter.dto';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateCourseChapterDto extends PartialType(CreateCourseChapterDto) {
  @IsOptional()
  @IsObject()
  description: object;
}
