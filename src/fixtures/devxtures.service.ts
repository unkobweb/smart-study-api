import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MeiliSearch } from "meilisearch";
import { Job } from "../entities/job.entity";
import { Repository } from "typeorm";

@Injectable()
export class DevxturesService implements OnModuleInit {
  
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  async generate() {
    const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: process.env.MEILISEARCH_MASTER_KEY})

    let jobs = await this.jobRepository.find()
    //delete all jobs
    if (jobs.length > 0) {
      await this.jobRepository.remove(jobs)
      console.info('Jobs fixtures deleted');
    }

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
        }
      ]
      await client.index('job').deleteAllDocuments()
      jobs = await this.jobRepository.save(jobData)
      await client.index('job').addDocuments(jobs)
      console.info('Jobs fixtures generated');
    }
  }
  
  async onModuleInit() {
    await this.generate();
    console.info('Devxtures generated');
  }
}