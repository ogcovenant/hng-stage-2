import { Request, Response } from "express";
import { responseObject } from "../../common/utils/responseObject";
import db from "../../common/config/dbconfig";

export const getUserRecord = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.id;
  const reqId = req.params.id;

  if (userId !== reqId) {
    return res.status(401).json(
      responseObject({
        status: "unauthorized",
        message: "you are not authorized to view this user's records",
      })
    );
  }

  try {
    const user = await db.user.findFirst({
      where: {
        id: reqId,
      },
    });

    //@ts-ignore
    if (!user && !user.id) {
      return res.status(404).json(
        responseObject({
          status: "Not Found",
          message: "no user with the provided id was found",
        })
      );
    }

    return res.status(200).json(
      responseObject({
        status: "success",
        message: "user record successfully retrieved",
        data: {
          userId: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.lastName,
          phone: user?.phone,
        },
      })
    );
  } catch (err) {
    return res.status(500).json({ message: "an error occured!", err: err });
  }
};
