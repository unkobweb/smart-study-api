import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursePartDto } from './create-course-part.dto';
import { IsDefined, IsString } from "class-validator";
import { Course } from '../../entities/course.entity';

export class UpdateCoursePartDto extends PartialType(CreateCoursePartDto) {    
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    course: Course;
}
