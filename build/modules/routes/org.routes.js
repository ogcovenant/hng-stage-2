"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const org_controller_1 = require("../controllers/org.controller");
const schema_1 = require("../../common/helpers/schema");
const validator_1 = require("../../common/middlewares/validator");
const orgRouter = express_1.default.Router();
orgRouter.get("/", org_controller_1.getOrganisations);
orgRouter.get("/:orgId", schema_1.getAnOrganisationSchema, validator_1.validator, org_controller_1.getAnOrganisation);
orgRouter.post("/", schema_1.createOrganisationSchema, validator_1.validator, org_controller_1.createOrganisation);
orgRouter.post("/:orgId/users", schema_1.getAnOrganisationSchema, validator_1.validator, org_controller_1.addAUserToOrganisation);
exports.default = orgRouter;
