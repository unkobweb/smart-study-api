import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Course } from './entities/course.entity';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { CoursesModule } from './courses/courses.module';
import { CoursePart } from './entities/course-part.entity';
import { CoursePartModule } from './course-part/course-part.module';
import { CourseChapterModule } from './course-chapter/course-chapter.module';
import { CourseChapter } from './entities/course-chapter.entity';
import { MediaModule } from './media/media.module';
import { Media } from './entities/media.entity';
import { FixturesModule } from './fixtures/fixtures.module';
import { JobsModule } from './jobs/jobs.module';
import { PurchaseModule } from './purchase/purchase.module';
import { JobSalaryModule } from './job-salary/job-salary.module';
import { JobSalary } from './entities/job-salary.entity';
import { CourseJob } from './entities/course-job.entity';
import { UserChapterCompletion } from './entities/user-chapter-completion.entity';
import { Purchase } from './entities/purchase.entity';
import { Job } from './entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [CourseChapter, CoursePart, Course, User, Media, JobSalary, CourseJob, UserChapterCompletion, Purchase, Job],
      synchronize: process.env.DB_SYNC === 'true' ? true : false
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    EmailModule,
    CoursesModule,
    CoursePartModule,
    CourseChapterModule,
    UsersModule,
    MediaModule,
    FixturesModule,
    JobsModule,
    PurchaseModule,
    JobSalaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
