import { Controller, Get, Request, Post, UseGuards, UseInterceptors, UploadedFile, Body, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { UploadDto } from './dto/upload.dto';

@Controller('media')
export class MediaController {

  constructor(
    private readonly mediaService: MediaService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: UploadDto) {
    return this.mediaService.uploadFile(file, dto.key);
  }

  @Delete(':uuid')
  async deleteFile(@Param('uuid') uuid: string) {
    return this.mediaService.deleteFile(uuid);
  }
}
