import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}