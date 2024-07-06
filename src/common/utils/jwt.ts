import * as jwt from "jsonwebtoken"
import { ENVIRONMENT } from "../config/environment";


export const encodeJWT = (id : string ): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, ENVIRONMENT.JWT_SECRET as string, { expiresIn: '7d' }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
}

export const decodeJWT = (token: string) => {
  return jwt.verify(token, ENVIRONMENT.JWT_SECRET as string)
}