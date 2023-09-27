import { Request, Response, NextFunction, urlencoded } from 'express';

export function excludeUrlencodedBodyMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST' && req.url === '/purchase/webhook') {
    next(); // Si c'est la route à exclure, passe au middleware suivant sans rien faire.
  } else {
    // Si ce n'est pas la route à exclure, applique les middlewares json et urlencoded.
    urlencoded({ limit: '50mb', extended: true })(req, res, next);
  }
};