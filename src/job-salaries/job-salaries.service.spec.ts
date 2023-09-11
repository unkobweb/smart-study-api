import { Test, TestingModule } from '@nestjs/testing';
import { JobSalariesService } from './job-salaries.service';

describe('JobSalariesService', () => {
  let service: JobSalariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobSalariesService],
    }).compile();

    service = module.get<JobSalariesService>(JobSalariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
