import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { CoursePart } from 'src/entities/course-part.entity';
import { Course } from 'src/entities/course.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CreateCoursePartGuard implements CanActivate {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const courseUuid = request.body.course
    const course = await this.courseRepository.findOne({
      where: { uuid: courseUuid },
      relations: ['user']
    })
    return request.user.uuid === course.user.uuid;
    
  }
}