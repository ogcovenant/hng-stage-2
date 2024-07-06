import express from "express"
import { ENVIRONMENT } from "./common/config/environment";
import cors from 'cors'
import helmet from 'helmet'
import logger from "./common/utils/logger";
import { Request, Response, NextFunction } from "express";
import authRouter from "./modules/routes/auth.routes";
import userRouter from "./modules/routes/user.routes";
import { verifyJWT } from "./common/middlewares/validator";
import orgRouter from "./modules/routes/org.routes";

const PORT = ENVIRONMENT.PORT

const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRouter)
app.use('/api/users', verifyJWT, userRouter);
app.use('/api/organisations', verifyJWT, orgRouter)

app.get("/", (_, res: Response) => {
  res.status(200).json({ msg: "Hello World" })
})

app.use((req, res, next) => {
  res.status(404).json({
    status: 'Not Found',
    message: 'The requested resource was not found on this server.',
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger(`Error: ${err.message}`);
  res.status(500).json({ message: 'An error occurred!', error: err.message });
});

app.listen(PORT, () => {
  logger(`Server is live on port:${PORT} 🚀🚀🚀`);
})
