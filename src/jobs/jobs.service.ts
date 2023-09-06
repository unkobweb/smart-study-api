import { Injectable } from '@nestjs/common';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobsService {
  
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
  ) { }


  findAll() {
    return this.jobRepository.find();
  }

  async findOne(uuid: string) {
    const job = await this.jobRepository.findOne({
      where: {uuid: uuid},
    })

    return job;
  }
}
