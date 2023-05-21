import { IsDefined, IsString } from "class-validator";

export class UploadDto {
  @IsDefined()
  @IsString()
  key: string;
}