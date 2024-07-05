import { body } from "express-validator";

export const signupSchema = [
  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name must not be null"),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name must not be null"),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .notEmpty()
    .withMessage("Email must not be null"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password must not be null"),
  body("phone")
    .isString()
    .withMessage("Phone must be a string")
    .notEmpty()
    .withMessage("Phone Number must not be null"),
];

export const loginSchema = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .notEmpty()
    .withMessage("Email must not be null"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password must not be null"),
];
