import * as jwt from "jsonwebtoken"
import { ENVIRONMENT } from "../config/environment";


export const encodeJWT = (id : string, expiresIn: string ): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, ENVIRONMENT.JWT_SECRET as string, { expiresIn: expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
}

export const decodeJWT = async(token: string) => {
  try {
    return new Promise((resolve) => {
      const decoded = jwt.verify(token, ENVIRONMENT.JWT_SECRET as string)

      resolve(decoded)
    })
  } catch (error) {
    return null;
  }
}