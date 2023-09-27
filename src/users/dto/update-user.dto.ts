import { IsDate, IsDateString, IsDefined, IsOptional, IsString, IsUUID } from "class-validator";
import { Media } from "../../entities/media.entity";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  @IsUUID('4')
  profilePicture?: Media;
}