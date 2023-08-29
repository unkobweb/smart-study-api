import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursePart } from 'src/entities/course-part.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserOwnCoursePart implements CanActivate {

  constructor(
    @InjectRepository(CoursePart)
    private readonly coursePartRepository: Repository<CoursePart>,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const coursePartUuid = request.body.uuid
    const coursePart = await this.coursePartRepository.findOne({
      where: { uuid: coursePartUuid },
      relations: ['course','course.user']
    })
    return request.user.uuid === coursePart.course.user.uuid;
    
  }
}