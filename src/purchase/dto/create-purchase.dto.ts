import { IsDefined, IsString } from "class-validator";
import { Course } from "../../entities/course.entity";

export class CreatePurchaseDto {
  @IsDefined()
  @IsString()
  course: Course;
}
