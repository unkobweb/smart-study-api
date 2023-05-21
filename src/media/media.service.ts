import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from '../entities/media.entity';
import * as aws from 'aws-sdk';

@Injectable()
export class MediaService {

  S3_BUCKET = process.env.S3_BUCKET;
  s3 = new aws.S3({
    credentials: {
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
    },
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    sslEnabled: true,
  });

  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async uploadFile(file: Express.Multer.File, key: string) {
    await this.s3.putObject({
      Bucket: this.S3_BUCKET,
      Key: key,
      Body: file.buffer,
    }, (err, data) => {
      if (err) {
        throw err;
      }
    }).promise();
    return this.mediaRepository.save({
      name: file.originalname,
      key: key,
      size: file.size,
    });
  }

  async deleteFile(uuid: string) {
    const media = await this.mediaRepository.findOne({where: {uuid}});
    await this.s3.deleteObject({
      Bucket: this.S3_BUCKET,
      Key: media.key,
    }, (err, data) => {
      if (err) {
        throw err;
      }
    }).promise();
    return this.mediaRepository.softDelete(uuid);
  }

}
