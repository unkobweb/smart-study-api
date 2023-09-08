import { Injectable } from '@nestjs/common';
import MeiliSearch from 'meilisearch';

@Injectable()
export class AppService {

  client: MeiliSearch;

  constructor() {
    this.client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_MASTER_KEY
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getMeiliSearchKey(): Promise<string> {
    return this.client.getKeys().then((keys) => {
      return keys.results[0].key;
    });
  }
}
