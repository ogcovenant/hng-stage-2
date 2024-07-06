"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseObject = void 0;
const responseObject = ({ status, message, data, statusCode }) => {
    return {
        status,
        message,
        data,
        statusCode
    };
};
exports.responseObject = responseObject;
