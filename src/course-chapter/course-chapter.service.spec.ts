import { Test, TestingModule } from '@nestjs/testing';
import { CourseChapterService } from './course-chapter.service';

describe('CourseChapterService', () => {
  let service: CourseChapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseChapterService],
    }).compile();

    service = module.get<CourseChapterService>(CourseChapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
