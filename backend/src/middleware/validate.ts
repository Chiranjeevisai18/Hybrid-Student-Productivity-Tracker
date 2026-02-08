import { Request, Response, NextFunction } from "express";

export const validate =
  (rules: (req: Request) => string[] | null) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errors = rules(req);
    if (errors && errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
