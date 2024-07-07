"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.validator = void 0;
const express_validator_1 = require("express-validator");
const jwt_1 = require("../utils/jwt");
const responseObject_1 = require("../utils/responseObject");
const validator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array().map((err) => ({
                //@ts-ignore
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};
exports.validator = validator;
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json((0, responseObject_1.responseObject)({
            status: "unauthorized",
            message: "No token provided",
            statusCode: 401,
        }));
    }
    const token = authHeader.split(" ")[1];
    if (authHeader.split(" ")[0] !== "Bearer" && !token) {
        return res.status(401).json((0, responseObject_1.responseObject)({
            status: "unauthorized",
            message: "invalid authorization parameters",
            statusCode: 401,
        }));
    }
    const decoded = yield (0, jwt_1.decodeJWT)(token);
    //@ts-ignore
    req.user = decoded.id;
    next();
});
exports.verifyJWT = verifyJWT;
