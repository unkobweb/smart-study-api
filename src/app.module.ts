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
      entities: [User, Course, CoursePart, CourseChapter],
      synchronize: !!process.env.DB_SYNC || false,
    }),
    AuthModule,
    EmailModule, 
    UsersModule, 
    CoursesModule,
    CoursePartModule,
    CourseChapterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
