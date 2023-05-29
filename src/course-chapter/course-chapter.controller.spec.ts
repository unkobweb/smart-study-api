import { Test, TestingModule } from '@nestjs/testing';
import { CourseChapterController } from './course-chapter.controller';
import { CourseChapterService } from './course-chapter.service';

describe('CourseChapterController', () => {
  let controller: CourseChapterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseChapterController],
      providers: [CourseChapterService],
    }).compile();

    controller = module.get<CourseChapterController>(CourseChapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
