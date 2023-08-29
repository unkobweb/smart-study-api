import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    thumbnail: string;

    @IsOptional()
    @IsNumber()
    tags: number;
    
    @IsOptional()
    @IsNumber()
    price: number;
}
