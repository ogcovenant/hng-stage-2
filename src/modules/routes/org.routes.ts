import express from "express"
import { createOrganisation, getAnOrganisation, getOrganisations } from "../controllers/org.controller"

const orgRouter = express.Router()

orgRouter.get("/", getOrganisations)
orgRouter.get("/:orgId", getAnOrganisation)
orgRouter.post("/", createOrganisation)
orgRouter.post("/:orgId/users")

export default orgRouter