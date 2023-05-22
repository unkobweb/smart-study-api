import { Test, TestingModule } from '@nestjs/testing';
import { CoursePartController } from './course_part.controller';
import { CoursePartService } from './course_part.service';

describe('CoursePartController', () => {
  let controller: CoursePartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursePartController],
      providers: [CoursePartService],
    }).compile();

    controller = module.get<CoursePartController>(CoursePartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
