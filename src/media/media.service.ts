import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from '../entities/media.entity';
import * as aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

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

  async uploadFile(file: Express.Multer.File, key: string, extra?: any) {
    key = key+"/"+uuidv4()+file.originalname
    await this.s3.putObject({
      Bucket: this.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
    }).promise();
    const url = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.S3_BUCKET,
      Key: key
    });
    let media = await this.mediaRepository.findOne({where: {key: key}});
    if (!media) {
      media = await this.mediaRepository.save({
        ...extra,
        name: file.originalname,
        key: key,
        size: file.size,
        url: url,
      });
    }
    return media;
  }

  async getLink(uuid: string) {
    const media = await this.mediaRepository.findOne({where: {uuid}});
    if (!media) {
      throw new BadRequestException("Media not found");
    }
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.S3_BUCKET,
      Key: media.key,
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
