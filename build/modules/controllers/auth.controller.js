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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.createUser = void 0;
const dbconfig_1 = __importDefault(require("../../common/config/dbconfig"));
const responseObject_1 = require("../../common/utils/responseObject");
const jwt_1 = require("../../common/utils/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const environment_1 = require("../../common/config/environment");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, phone } = req.body;
    try {
        const existingUser = yield dbconfig_1.default.user.findFirst({
            where: {
                email: email,
            },
        });
        //@ts-ignore
        if (existingUser && existingUser.email === email) {
            return res.status(409).json((0, responseObject_1.responseObject)({
                status: "conflict",
                message: "user with email already exists",
            }));
        }
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: yield bcryptjs_1.default.hash(password, Number(environment_1.ENVIRONMENT.HASH_SALT)),
            phone: phone || null,
        };
        const user = yield dbconfig_1.default.user.create({
            data: Object.assign(Object.assign({}, userData), { organisations: {
                    create: {
                        name: `${userData.firstName}'s Organisation`,
                    },
                } }),
        });
        const jwtToken = yield (0, jwt_1.encodeJWT)(user.id, "7d");
        //@ts-ignore
        if (!user && !user.id) {
            return res.status(400).json((0, responseObject_1.responseObject)({
                status: "Bad request",
                message: "Registration unsuccessful",
                statusCode: 400,
            }));
        }
        return res.status(201).json((0, responseObject_1.responseObject)({
            status: "success",
            message: "Registration successful",
            data: {
                accessToken: jwtToken,
                user: {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            },
        }));
    }
    catch (err) {
        return res.status(500).json({ message: "An error occurred!", error: err });
    }
});
exports.createUser = createUser;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield dbconfig_1.default.user.findFirst({
            where: {
                email: email,
            },
        });
        //@ts-ignore
        if (!existingUser || !existingUser.id) {
            return res.status(401).json((0, responseObject_1.responseObject)({
                status: "Bad request",
                message: "Authentication failed",
                statusCode: 401,
            }));
        }
        //@ts-ignore
        const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json((0, responseObject_1.responseObject)({
                status: "Bad request",
                message: "Authentication failed",
                statusCode: 401,
            }));
        }
        //@ts-ignore
        const jwtToken = yield (0, jwt_1.encodeJWT)(existingUser.id);
        return res.status(200).json((0, responseObject_1.responseObject)({
            status: "success",
            message: "Login successful",
            data: {
                accessToken: jwtToken,
                user: {
                    userId: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id,
                    firstName: existingUser === null || existingUser === void 0 ? void 0 : existingUser.firstName,
                    lastName: existingUser === null || existingUser === void 0 ? void 0 : existingUser.lastName,
                    email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
                    phone: existingUser === null || existingUser === void 0 ? void 0 : existingUser.phone
                }
            }
        }));
    }
    catch (err) {
        return res.status(500).json({ message: "An error occurred!", error: err });
    }
});
exports.checkUser = checkUser;
