import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "../entities/job.entity";
import { DevxturesService } from "./devxtures.service";
import { Course } from "../entities/course.entity";
import { JobSalary } from "../entities/job-salary.entity";
import { User } from "../entities/user.entity";
import { TestxturesService } from "./testxtures.service";
import { UserChapterCompletion } from "../entities/user-chapter-completion.entity";
import { Purchase } from "../entities/purchase.entity";

const obj = {
  prod: [],
  development: [DevxturesService],
  staging: [DevxturesService],
  test: [TestxturesService],
}

@Module({
  imports: [TypeOrmModule.forFeature([Job, Course, JobSalary, User, UserChapterCompletion, Purchase])],
  providers: obj[process.env.NODE_ENV],
})
export class FixturesModule {}