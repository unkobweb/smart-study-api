import { IsDefined, IsString } from "class-validator";
import { Course } from "../../entities/course.entity";

export class CreateCoursePartDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    course: Course;
}
