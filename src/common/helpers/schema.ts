import { body, param } from "express-validator";

export const signupSchema = [
  body("firstName")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
  body("lastName")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
  body("email")
    .isEmail()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
  body("password")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
  body("phone").optional().isString().withMessage("Invalid value"),
];

export const loginSchema = [
  body("email")
    .isEmail()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
  body("password")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
];

export const getUserRecordSchema = [
  param("id")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
];

export const getAnOrganisationSchema = [
  param("orgId")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
];

export const createOrganisationSchema = [
  body("name")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
  body("description")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
];

export const addAUserToOrganisationSchema = [
  param("orgId")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
  body("userId")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Invalid value"),
];
