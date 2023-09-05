import { IsDefined, IsString } from "class-validator";
import { CourseChapter } from "src/entities/course-chapter.entity";

export class UploadImageDto {
    @IsDefined()
    @IsString()
    courseChapter: CourseChapter;

    @IsDefined()
    @IsString()
    filename: string;
}
