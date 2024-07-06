import * as dotenv from 'dotenv'

dotenv.config()

export const ENVIRONMENT = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  HASH_SALT: process.env.HASH_SALT
}