"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const environment_1 = require("./common/config/environment");
const logger_1 = __importDefault(require("./common/utils/logger"));
const PORT = environment_1.ENVIRONMENT.PORT;
app_1.default.listen(PORT, () => {
    (0, logger_1.default)(`Server is live on port:${PORT} 🚀🚀🚀`);
});
