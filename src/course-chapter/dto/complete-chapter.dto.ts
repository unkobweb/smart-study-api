import { IsBoolean, IsDefined } from "class-validator";

export class CompleteChapterDto {
  @IsDefined()
  @IsBoolean()
  completed: boolean;
}