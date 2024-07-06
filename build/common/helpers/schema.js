"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const express_validator_1 = require("express-validator");
exports.signupSchema = [
    (0, express_validator_1.body)("firstName")
        .isString()
        .withMessage("First name must be a string")
        .notEmpty()
        .withMessage("First name must not be null"),
    (0, express_validator_1.body)("lastName")
        .isString()
        .withMessage("Last name must be a string")
        .notEmpty()
        .withMessage("Last name must not be null"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .notEmpty()
        .withMessage("Email must not be null"),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password must not be null"),
    (0, express_validator_1.body)("phone")
        .isString()
        .withMessage("Phone must be a string")
        .notEmpty()
        .withMessage("Phone Number must not be null"),
];
exports.loginSchema = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .notEmpty()
        .withMessage("Email must not be null"),
    (0, express_validator_1.body)("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password must not be null"),
];
