"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("./common/config/environment");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./common/utils/logger"));
const auth_routes_1 = __importDefault(require("./modules/routes/auth.routes"));
const PORT = environment_1.ENVIRONMENT.PORT;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", auth_routes_1.default);
app.get("/", (_, res) => {
    res.status(200).json({ msg: "Hello World" });
});
app.use((err, req, res, next) => {
    (0, logger_1.default)(`Error: ${err.message}`);
    res.status(500).json({ message: 'An error occurred!', error: err.message });
});
app.listen(PORT, () => {
    (0, logger_1.default)(`Server is live on port:${PORT} 🚀🚀🚀`);
});
