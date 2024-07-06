import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { decodeJWT } from "../utils/jwt";
import { responseObject } from "../utils/responseObject";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((err) => ({
        //@ts-ignore
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

export const verifyJWT = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(
      responseObject({
        status: "unauthorized",
        message: "No token provided",
        statusCode: 401,
      })
    );
  }

  const token = authHeader.split(" ")[1];

  if (authHeader.split(" ")[0] !== "Bearer" && !token) {
    return res.status(401).json(
      responseObject({
        status: "unauthorized",
        message: "invalid authorization parameters",
        statusCode: 401,
      })
    );
  }

  const decoded = await decodeJWT(token);

  req.user = decoded as string;
  next();
};
