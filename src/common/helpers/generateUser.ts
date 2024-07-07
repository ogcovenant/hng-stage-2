import db from "../config/dbconfig";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcryptjs'
import { ENVIRONMENT } from "../config/environment";

export const generateUser = async () => {
  const user = await db.user.create({
    data: {
      firstName: faker.internet.displayName(),
      lastName: faker.internet.displayName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("Admin", Number(ENVIRONMENT.HASH_SALT)),
      phone: "12345678900",
    },
  });

  return user
};
export const generateUserInfo = () => {
  return {
    firstName: faker.internet.displayName(),
    lastName: faker.internet.displayName(),
    email: faker.internet.email(),
    password: "ADMIN",
    phone: "1234567890"
  }
}
