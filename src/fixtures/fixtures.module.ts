import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "../entities/job.entity";
import { DevxturesService } from "./devxtures.service";
import { AverageJobSalary } from "src/entities/average-job-salary.entity";

const obj = {
  prod: [],
  development: [DevxturesService],
  staging: [DevxturesService]
}

@Module({
  imports: [TypeOrmModule.forFeature([Job, AverageJobSalary])],
  providers: obj[process.env.NODE_ENV],
})
export class FixturesModule {}