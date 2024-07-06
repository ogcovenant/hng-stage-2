import express from 'express'
import { getUserRecord } from '../controllers/user.controller'
import { getUserRecordSchema } from '../../common/helpers/schema'
import { validator } from '../../common/middlewares/validator'

const userRouter = express.Router()

userRouter.get("/users/:id", getUserRecordSchema, validator, getUserRecord)

export default userRouter