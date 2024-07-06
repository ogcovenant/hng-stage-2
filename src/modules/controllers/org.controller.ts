import { Request, Response } from "express";
import db from "../../common/config/dbconfig";
import { responseObject } from "../../common/utils/responseObject";

export const getOrganisations = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user;

  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        organisations: true,
      },
    });

    if (!user || !user.id) {
      return res.status(401).json(
        responseObject({
          status: "Not Found",
          message: "User not found",
          statusCode: 401,
        })
      );
    }

    const organisations = user.organisations;

    return res.status(200).json(
      responseObject({
        status: "success",
        message: "user's organisation successfully retrieved",
        data: {
          organisations: organisations.map((org) => ({
            orgId: org.id,
            name: org.name,
            description: org.description,
          })),
        },
      })
    );
  } catch (err) {
    return res.status(500).json({ message: "an error occured!", err: err });
  }
};

export const getAnOrganisation = async(req: Request, res: Response) => {
  const orgId = req.params.orgId;
  //@ts-ignore
  const userId = req.user;

  try {
    const org = await db.organisation.findFirst({
      where: {
        id: orgId,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    //@ts-ignore
    if (!org || !org.id) {
      res.status(404).json(
        responseObject({
          status: "Not Found",
          message: "organisation not found",
          statusCode: 404,
        })
      );
    }

    return res.status(200).json(responseObject({
      status: "success",
      message: "Organisation successfully retrieved",
      data: {
        orgId: org?.id,
        name: org?.name,
        description: org?.description
      }
    }))
  } catch (err) {
    return res.status(500).json({ message: "an error occured!", err: err });
  }
};

export const createOrganisation = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user
  const { name, description } = req.body

  try {
    const organisation = await db.organisation.create({
      data: {
        name,
        description,
        users: {
          connect: {
            id: userId
          }
        }
      }
    })

    if(!organisation || !organisation.id){
      return res.status(400).json(responseObject({
        status: "Bad Request",
        message: "Client error",
        statusCode: 400
      }))
    }

    return res.status(201).json(responseObject({
      status: "success",
      message: "Organisation created successfully",
      data: {
        orgId: organisation.id,
        name: organisation.description,
        description: organisation.description
      }
    }))
  } catch (err) {
    return res.status(500).json({ message: "an error occured!", err })
  }
};

export const addAUserToOrganisation = async (req: Request, res: Response) => {
  const orgId = req.params.orgId
  //@ts-ignore
  const { userId } = req.body


  try{ 
    await db.organisation.update({
      where: {
        id: orgId
      },
      data: {
        users: {
          connect: {
            id: userId
          }
        }
      }
    })

    return res.status(200).json(responseObject({
      status: "success",
      message: "User added to organisation successfully"
    }))
  }catch(err) {
    return res.status(500).json({ message: "an error occured!", err })
  }
};
