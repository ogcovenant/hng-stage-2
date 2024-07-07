"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAUserToOrganisationSchema = exports.createOrganisationSchema = exports.getAnOrganisationSchema = exports.getUserRecordSchema = exports.loginSchema = exports.signupSchema = void 0;
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
    (0, express_validator_1.body)("phone").optional().isString().withMessage("Phone must be a string"),
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
exports.getUserRecordSchema = [
    (0, express_validator_1.param)("id")
        .isString()
        .withMessage("userId must be a string")
        .notEmpty()
        .withMessage("userId must not be null"),
];
exports.getAnOrganisationSchema = [
    (0, express_validator_1.param)("orgId")
        .isString()
        .withMessage("orgId must be a string")
        .notEmpty()
        .withMessage("orgId must not be null"),
];
exports.createOrganisationSchema = [
    (0, express_validator_1.body)("name")
        .isString()
        .withMessage("organisation name must be a string")
        .notEmpty()
        .withMessage("organisation name must not be null"),
    (0, express_validator_1.body)("description")
        .isString()
        .withMessage("organisation description must be a string")
        .notEmpty()
        .withMessage("organisation description must not be null"),
];
exports.addAUserToOrganisationSchema = [
    (0, express_validator_1.body)("userId")
        .isString()
        .withMessage("userId must be a string")
        .notEmpty()
        .withMessage("userId must not be null"),
];
