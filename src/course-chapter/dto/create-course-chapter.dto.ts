import { IsDefined, IsString } from "class-validator";
import { CoursePart } from "../../entities/course-part.entity";

export class CreateCourseChapterDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    coursePart: CoursePart;
}
