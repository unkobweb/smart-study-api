import { Test, TestingModule } from '@nestjs/testing';
import { CoursePartService } from './course_part.service';

describe('CoursePartService', () => {
  let service: CoursePartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursePartService],
    }).compile();

    service = module.get<CoursePartService>(CoursePartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
