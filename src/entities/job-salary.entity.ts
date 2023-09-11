



import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class JobSalary {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  date: Date;

  @Column()
  website : string;

  @Column()
  avgSalary: number;

  @Column()
  nbOffers: number;

  @ManyToOne(() => Job, job => job.averageSalaries)
  job: Job;
}