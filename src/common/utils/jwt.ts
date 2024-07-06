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

export const decodeJWT = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(ENVIRONMENT.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(String(decoded));
      }
    })
  })
}