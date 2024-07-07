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
exports.addAUserToOrganisation = exports.createOrganisation = exports.getAnOrganisation = exports.getOrganisations = void 0;
const dbconfig_1 = __importDefault(require("../../common/config/dbconfig"));
const responseObject_1 = require("../../common/utils/responseObject");
const getOrganisations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user;
    try {
        const user = yield dbconfig_1.default.user.findFirst({
            where: {
                id: userId,
            },
            include: {
                organisations: true,
            },
        });
        if (!user || !user.id) {
            return res.status(401).json((0, responseObject_1.responseObject)({
                status: "Not Found",
                message: "User not found",
                statusCode: 401,
            }));
        }
        const organisations = user.organisations;
        return res.status(200).json((0, responseObject_1.responseObject)({
            status: "success",
            message: "user's organisation successfully retrieved",
            data: {
                organisations: organisations.map((org) => ({
                    orgId: org.id,
                    name: org.name,
                    description: org.description,
                })),
            },
        }));
    }
    catch (err) {
        return res.status(500).json({ message: "an error occured!", err: err });
    }
});
exports.getOrganisations = getOrganisations;
const getAnOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgId = req.params.orgId;
    //@ts-ignore
    const userId = req.user;
    try {
        const org = yield dbconfig_1.default.organisation.findFirst({
            where: {
                id: orgId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        });
        //@ts-ignore
        if (!org || !org.id) {
            res.status(404).json((0, responseObject_1.responseObject)({
                status: "Not Found",
                message: "organisation not found",
                statusCode: 404,
            }));
        }
        return res.status(200).json((0, responseObject_1.responseObject)({
            status: "success",
            message: "Organisation successfully retrieved",
            data: {
                orgId: org === null || org === void 0 ? void 0 : org.id,
                name: org === null || org === void 0 ? void 0 : org.name,
                description: org === null || org === void 0 ? void 0 : org.description
            }
        }));
    }
    catch (err) {
        return res.status(500).json({ message: "an error occured!", err: err });
    }
});
exports.getAnOrganisation = getAnOrganisation;
const createOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.user;
    const { name, description } = req.body;
    try {
        const organisation = yield dbconfig_1.default.organisation.create({
            data: {
                name,
                description,
                users: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        if (!organisation || !organisation.id) {
            return res.status(400).json((0, responseObject_1.responseObject)({
                status: "Bad Request",
                message: "Client error",
                statusCode: 400
            }));
        }
        return res.status(201).json((0, responseObject_1.responseObject)({
            status: "success",
            message: "Organisation created successfully",
            data: {
                orgId: organisation.id,
                name: organisation.description,
                description: organisation.description
            }
        }));
    }
    catch (err) {
        return res.status(500).json({ message: "an error occured!", err });
    }
});
exports.createOrganisation = createOrganisation;
const addAUserToOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgId = req.params.orgId;
    //@ts-ignore
    const { userId } = req.body;
    try {
        yield dbconfig_1.default.organisation.update({
            where: {
                id: orgId
            },
            data: {
                users: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return res.status(200).json((0, responseObject_1.responseObject)({
            status: "success",
            message: "User added to organisation successfully"
        }));
    }
    catch (err) {
        return res.status(500).json({ message: "an error occured!", err });
    }
});
exports.addAUserToOrganisation = addAUserToOrganisation;
