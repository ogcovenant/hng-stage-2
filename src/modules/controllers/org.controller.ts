import { Request, Response } from "express";
import db from "../../common/config/dbconfig";
import { responseObject } from "../../common/utils/responseObject";

export const getOrganisations = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user;

  try{
    const user = await db.user.findFirst({
      where: {
        id: userId
      },
      include: {
        organisations: true
      }
    })

    if(!user || !user.id){
      return res.status(401).json(responseObject({
        status: 'Not Found',
        message: 'User not found',
        statusCode: 401
      }))
    }

    const organisations = user.organisations

    return res.status(200).json(responseObject({
      status: "success",
      message: "user's organisation successfully retrieved",
      data: {
        organisations: organisations.map((org) => ({
          orgId: org.id,
          name: org.name,
          description: org.description
        }))
      }
    }))

  }catch(err){
    return res.status(500).json({ message: "an error occured!", err: err })
  }
}

export const getAnOrganisation = (req: Request, res: Response) => {

}

export const createOrganisation = (req: Request, res: Response) => {

}

export const getAnOrganisationUsers = (req: Request, res: Response) => {

}