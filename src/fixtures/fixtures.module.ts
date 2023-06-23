import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "../entities/job.entity";
import { DevxturesService } from "./devxtures.service";

const obj = {
  prod: [],
  development: [DevxturesService],
  staging: []
}

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: obj[process.env.NODE_ENV],
})
export class FixturesModule {}