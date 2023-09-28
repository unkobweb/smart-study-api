import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseChapter } from '../../entities/course-chapter.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UpdateCourseChapterGuard implements CanActivate {

  constructor(
    @InjectRepository(CourseChapter)
    private readonly courseChapterRepository: Repository<CourseChapter>,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const courseUuid = request.params.uuid
    const courseChapter = await this.courseChapterRepository.findOne({
      where: { uuid: courseUuid },
      relations: ['user']
    })
    return request.user.uuid === courseChapter.coursePart.course.user.uuid;
    
  }
}