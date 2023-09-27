import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MeiliSearch } from "meilisearch";
import { Job } from "../entities/job.entity";
import { Repository } from "typeorm";
import { JobSalary } from "src/entities/job-salary.entity";
import { faker } from '@faker-js/faker';
import { Course } from "../entities/course.entity";

@Injectable()
export class DevxturesService implements OnModuleInit {
  
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
    @InjectRepository(JobSalary) private readonly jobSalaryRepository: Repository<JobSalary>,
  ) {}

  async generate() {
    const client = new MeiliSearch({ host: process.env.MEILISEARCH_HOST, apiKey: process.env.MEILISEARCH_MASTER_KEY})
    let averageSalaries = await this.jobSalaryRepository.find()
  
    if (averageSalaries.length > 0) {
      await this.jobSalaryRepository.remove(averageSalaries);
      console.info('Average jobs salaries fixtures deleted');
    }

    await client.createIndex('course',{primaryKey: 'uuid'})
    await client.index('course').updateFilterableAttributes(['isPublished'])
    await client.createIndex('job',{primaryKey: 'uuid'})

    let courses = await this.courseRepository.find()

    if (courses.length === 0) {
      await client.index('course').deleteAllDocuments()
    }

    let jobs = await this.jobRepository.find()

    if (jobs.length === 0) {
      const jobData = [
        {
          name: "Developpeur Backend",
          description: "Le développeur backend est en charge de la partie serveur d'une application web. Il est responsable de la gestion des données et de la logique métier de l'application. Il travaille en étroite collaboration avec le développeur frontend et le product owner.",
        }, 
        {
          name: "Intégrateur Frontend",
          description: "L'intégrateur frontend est en charge de la partie client d'une application web. Il est responsable de l'interface utilisateur et de l'expérience utilisateur. Il travaille en étroite collaboration avec le développeur backend et le product owner."
        }, 
        {
          name: "Product Owner",
          description: "Le product owner est en charge de la gestion du produit. Il est responsable de la définition des fonctionnalités et de la priorisation des tâches. Il travaille en étroite collaboration avec le développeur backend et le développeur frontend."
        },
        {
          name: "Data Scientist",
          description: "Le Data Scientist est en charge de la gestion des données. Il est responsable de la collecte, du traitement et de l'analyse des données. Il travaille en étroite collaboration avec le développeur backend et le product owner."
        },
        {
          name: "Administrateur Système",
          description: "L'administrateur système est en charge de la gestion des serveurs. Il est responsable de la configuration et de la maintenance des serveurs. Il travaille en étroite collaboration avec le développeur backend et le product owner."
        },
        {
          name: "DevOps",
          description: "Le DevOps est en charge de la gestion des serveurs. Il est responsable de la configuration et de la maintenance des serveurs. Il travaille en étroite collaboration avec le développeur backend et le product owner."
        }
      ]
      await client.index('job').deleteAllDocuments()
      jobs = await this.jobRepository.save(jobData)
      await client.index('job').addDocuments(jobs)
      console.info('Jobs fixtures generated');
    }

    if(averageSalaries.length === 0) {
      const newAverageSalaries = []
      for(const job of jobs) {
        for( let i=0; i < 12; i++){
          const month = new Date()
          month.setMonth(i)
          for(const website of ['PoleEmploi', 'Google']){
            newAverageSalaries.push({
              date : month,
              website : website,
              avgSalary : faker.number.int({ min: 10, max: 100 }),
              nbOffers: faker.number.int({ min: 0, max: 1000 }),
              job : {uuid: job.uuid}
            })
          }
        }
      }
      
      averageSalaries = await this.jobSalaryRepository.save(newAverageSalaries)
      console.info('Average job salary fixtures generated');
    }
  }

  
  async onModuleInit() {
    await this.generate();
    console.info('Devxtures generated');
  }
}