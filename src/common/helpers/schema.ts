import { body, param } from "express-validator";

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
  body("phone").optional().isString().withMessage("Phone must be a string"),
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

export const getUserRecordSchema = [
  param("id")
    .isString()
    .withMessage("userId must be a string")
    .notEmpty()
    .withMessage("userId must not be null"),
];

export const getAnOrganisationSchema = [
  param("orgId")
    .isString()
    .withMessage("orgId must be a string")
    .notEmpty()
    .withMessage("orgId must not be null"),
];

export const createOrganisationSchema = [
  body("name")
    .isString()
    .withMessage("organisation name must be a string")
    .notEmpty()
    .withMessage("organisation name must not be null"),
  body("description")
    .isString()
    .withMessage("organisation description must be a string")
    .notEmpty()
    .withMessage("organisation description must not be null"),
];

export const addAUserToOrganisationSchema = [
  body("userId")
    .isString()
    .withMessage("userId must be a string")
    .notEmpty()
    .withMessage("userId must not be null"),
];
