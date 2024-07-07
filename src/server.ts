import app from "./app";
import { ENVIRONMENT } from "./common/config/environment";
import logger from "./common/utils/logger";

const PORT = ENVIRONMENT.PORT


app.listen(PORT, () => {
  logger(`Server is live on port:${PORT} 🚀🚀🚀`);
})