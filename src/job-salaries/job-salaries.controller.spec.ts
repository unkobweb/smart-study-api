import { Test, TestingModule } from '@nestjs/testing';
import { JobSalariesController } from './job-salaries.controller';
import { JobSalariesService } from './job-salaries.service';

describe('JobSalariesController', () => {
  let controller: JobSalariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSalariesController],
      providers: [JobSalariesService],
    }).compile();

    controller = module.get<JobSalariesController>(JobSalariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
