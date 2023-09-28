import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Media } from '../../entities/media.entity';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    thumbnail: Media;

    @IsOptional()
    @IsString()
    video: Media;

    @IsOptional()
    @IsBoolean()
    isPublished: boolean;

    @IsOptional()
    @IsNumber()
    tags: number;
    
    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsArray()
    jobs: string[];
}
