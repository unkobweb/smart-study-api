import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MeiliSearch } from "meilisearch";
import { In, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserChapterCompletion } from "../entities/user-chapter-completion.entity";
import { Purchase } from "../entities/purchase.entity";

@Injectable()
export class TestxturesService implements OnModuleInit {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async generate() {
    await this.userRepository.delete({email: In(['test@example.com'])});
  }

  
  async onModuleInit() {
    await this.generate();
    // console.info('Testxtures generated');
  }
}