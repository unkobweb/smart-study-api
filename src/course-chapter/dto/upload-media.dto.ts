import { Transform } from "class-transformer";
import { IsBoolean, IsBooleanString, IsDefined, IsOptional, IsString, IsUUID } from "class-validator";

export class UploadMediaDto {
    @IsDefined()
    @IsString()
    @IsUUID()
    courseChapter: string;

    @IsDefined()
    @IsString()
    filename: string;

    @Transform(({ value }) => (value === 'true'))
    @IsOptional()
    @IsBoolean()
    isVideo?: boolean;
}
