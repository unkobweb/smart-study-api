import { Controller, Get, Param, Req } from '@nestjs/common';
import { JobSalariesService } from './job-salaries.service';

@Controller('job-salaries')
export class JobSalariesController {
  constructor(private readonly jobSalariesService: JobSalariesService) {}


  // @Get()
  // findAll() {
  //   return this.jobSalariesService.findAll();
  // }

  @Get('job')
  findAll(@Req() req) {
    return this.jobSalariesService.findAll({
      where: {
        job: { uuid: req.job.uuid }
      },
      relations: ['job']
    });
  }

  @Get(':id')
  findOne(@Param('uuid') uuid: string) {
    return this.jobSalariesService.findOne(uuid);
  }

}
