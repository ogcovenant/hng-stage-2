import express from "express"
import { ENVIRONMENT } from "./common/config/environment";
import cors from 'cors'
import helmet from 'helmet'
import logger from "./common/utils/logger";
import { Response } from "express";
import authRouter from "./modules/routes/auth.routes";

const PORT = ENVIRONMENT.PORT

const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRouter)

app.get("/", (_, res: Response) => {
  res.status(200).json({ msg: "Hello World" })
})

app.listen(PORT, () => {
  logger(`Server is live on port:${PORT} 🚀🚀🚀`);
})
