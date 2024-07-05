import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map(err => ({
        //@ts-ignore
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};