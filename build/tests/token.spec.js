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
const dbconfig_1 = __importDefault(require("../common/config/dbconfig"));
const jwt_1 = require("../common/utils/jwt");
let user;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    user = yield dbconfig_1.default.user.create({
        data: {
            firstName: "Covenant",
            lastName: "Ogowale",
            email: "justcovenant@gmail.com",
            password: "12345678",
            phone: "12345678900"
        }
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbconfig_1.default.user.delete({
        where: {
            //@ts-ignore
            id: user.id
        }
    });
}));
describe("generate an access token", () => {
    it("should generate a correctly expiring access token", () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const token = yield (0, jwt_1.encodeJWT)(user.id, "1s");
        const result = yield new Promise((resolve) => {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const decoded = yield (0, jwt_1.decodeJWT)(token);
                resolve(decoded);
            }), 900);
        });
        expect(result).not.toBeNull();
    }));
});
describe("decode the access token data", () => {
    it("should decode the access token data", () => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const token = (0, jwt_1.encodeJWT)(user.id, '7d');
        //@ts-ignore
        const decoded = yield (0, jwt_1.decodeJWT)(token);
        expect(decoded).not.toBeNull();
        //@ts-ignore
        expect(decoded).toBe(user.id);
    }));
});
