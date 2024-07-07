"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const schema_1 = require("../../common/helpers/schema");
const validator_1 = require("../../common/middlewares/validator");
const userRouter = express_1.default.Router();
userRouter.get("/:id", schema_1.getUserRecordSchema, validator_1.validator, user_controller_1.getUserRecord);
exports.default = userRouter;
