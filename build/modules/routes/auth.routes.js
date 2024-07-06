"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validator_1 = require("../../common/middlewares/validator");
const schema_1 = require("../../common/helpers/schema");
const authRouter = express_1.default.Router();
authRouter.post("/register", schema_1.signupSchema, validator_1.validator, auth_controller_1.createUser);
authRouter.post("/login", schema_1.loginSchema, validator_1.validator, auth_controller_1.checkUser);
exports.default = authRouter;
