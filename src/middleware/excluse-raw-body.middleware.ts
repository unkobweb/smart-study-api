import { Injectable, NestMiddleware } from '@nestjs/common';
import { json, urlencoded } from 'express';

@Injectable()
export class ExcludeRawBodyMiddleware implements NestMiddleware {
  use(req, res, next) {
    if (req.method === 'POST' && req.url === '/purchase/webhook') {
      next(); // Si c'est la route à exclure, passe au middleware suivant sans rien faire.
    } else {
      // Si ce n'est pas la route à exclure, applique les middlewares json et urlencoded.
      json({ limit: '50mb' })(req, res, next);
      urlencoded({ limit: '50mb', extended: true })(req, res, next);
      next();
    }
  }
}