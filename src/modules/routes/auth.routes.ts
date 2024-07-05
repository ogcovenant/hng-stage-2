import express from "express"
import { checkUser, createUser } from "../controllers/auth.controller"
import { validator } from "../../common/middlewares/validator"
import { signupSchema, loginSchema } from "../../common/helpers/schema"

const authRouter = express.Router()

authRouter.post("/register", signupSchema, validator, createUser)
authRouter.post("/login", loginSchema, validator, checkUser)

export default authRouter