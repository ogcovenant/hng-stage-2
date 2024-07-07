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
exports.getUserRecord = void 0;
const responseObject_1 = require("../../common/utils/responseObject");
const dbconfig_1 = __importDefault(require("../../common/config/dbconfig"));
const getUserRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user;
    const reqId = req.params.id;
    try {
        const user = yield dbconfig_1.default.user.findFirst({
            where: {
                id: reqId,
                organisations: {
                    some: {
                        users: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                },
            },
        });
        //@ts-ignore
        if (!user || !user.id) {
            return res.status(404).json((0, responseObject_1.responseObject)({
                status: "Not Found",
                message: "either you are not authorized to view this user or no user with the provided id was found",
            }));
        }
        return res.status(200).json((0, responseObject_1.responseObject)({
            status: "success",
            message: "user record successfully retrieved",
            data: {
                userId: user === null || user === void 0 ? void 0 : user.id,
                firstName: user === null || user === void 0 ? void 0 : user.firstName,
                lastName: user === null || user === void 0 ? void 0 : user.lastName,
                email: user === null || user === void 0 ? void 0 : user.email,
                phone: user === null || user === void 0 ? void 0 : user.phone,
            },
        }));
    }
    catch (err) {
        return res.status(500).json({ message: "an error occured!", err: err });
    }
});
exports.getUserRecord = getUserRecord;
