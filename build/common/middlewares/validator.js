"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const express_validator_1 = require("express-validator");
const validator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array().map(err => ({
                //@ts-ignore
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};
exports.validator = validator;
