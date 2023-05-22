import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursePartDto } from './create-course_part.dto';

export class UpdateCoursePartDto extends PartialType(CreateCoursePartDto) {}
