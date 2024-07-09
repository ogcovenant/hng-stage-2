import express from "express"
import { addAUserToOrganisation, createOrganisation, getAnOrganisation, getOrganisations } from "../controllers/org.controller"
import { addAUserToOrganisationSchema, createOrganisationSchema, getAnOrganisationSchema } from "../../common/helpers/schema"
import { validator } from "../../common/middlewares/validator"

const orgRouter = express.Router()

orgRouter.get("/", getOrganisations)
orgRouter.get("/:orgId", getAnOrganisationSchema, validator, getAnOrganisation)
orgRouter.post("/", createOrganisationSchema, validator, createOrganisation)
orgRouter.post("/:orgId/users", addAUserToOrganisationSchema, validator, addAUserToOrganisation)

export default orgRouter