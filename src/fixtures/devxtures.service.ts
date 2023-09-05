import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MeiliSearch } from "meilisearch";
import { Job } from "../entities/job.entity";
import { Repository } from "typeorm";
import { JobOffer } from "../entities/job-offer.entity";

@Injectable()
export class DevxturesService implements OnModuleInit {
  
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobOffer) private readonly jobOfferRepository: Repository<JobOffer>,
  ) {}

  async generate() {
    const client = new MeiliSearch({ host: process.env.MEILISEARCH_HOST, apiKey: process.env.MEILISEARCH_MASTER_KEY})

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
        }
      ]
      await client.index('job').deleteAllDocuments()
      jobs = await this.jobRepository.save(jobData)
      await client.index('job').addDocuments(jobs)
      console.info('Jobs fixtures generated');
    }

    let jobOffers = await this.jobOfferRepository.find()

    if (jobOffers.length === 0) {
      for (const job of jobs) {
        // create offer for each job and for each months
        for (let i = 0; i < 12; i++) {
          // create 5 offers for each month for each job
          for (let j = 0; j < 5; j++) {
            const offer = new JobOffer()
            offer.title = `${job.name} ${i + 1}/${j + 1}`
            offer.company = `Company ${i + 1}/${j + 1}`
            offer.salary = Math.floor(Math.random() * 100000)
            offer.job = job
            offer.createdAt = new Date(2022, i, j + 1)
            await this.jobOfferRepository.save(offer)
          }
        }
      }
    }
  }

  
  async onModuleInit() {
    await this.generate();
    console.info('Devxtures generated');
  }
}