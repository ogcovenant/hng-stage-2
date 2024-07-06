import { Request, Response } from "express";
import db from "../../common/config/dbconfig";
import { responseObject } from "../../common/utils/responseObject";
import { encodeJWT } from "../../common/utils/jwt";
import bcrypt from "bcryptjs";
import { ENVIRONMENT } from "../../common/config/environment";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    //@ts-ignore
    if (existingUser || existingUser.email === email) {
      return res.status(409).json(
        responseObject({
          status: "conflict",
          message: "user with email already exists",
        })
      );
    }

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, Number(ENVIRONMENT.HASH_SALT)),
      phone: phone,
    };

    const user = await db.user.create({
      data: {
        ...userData,
        organisations: {
          create: {
            name: `${userData.firstName}'s Organisation`,
          },
        },
      },
    });

    const jwtToken = await encodeJWT(user.id);

    //@ts-ignore
    if (!user || !user.id) {
      return res.status(400).json(
        responseObject({
          status: "Bad request",
          message: "Registration unsuccessful",
          statusCode: 400,
        })
      );
    }

    return res.status(201).json(
      responseObject({
        status: "success",
        message: "Registration successful",
        data: {
          accessToken: jwtToken,
          user: {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          },
        },
      })
    );
  } catch (err) {
    return res.status(500).json({ message: "An error occurred!", error: err });
  }
};

export const checkUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    //@ts-ignore
    if (!existingUser || !existingUser.id) {
      return res.status(401).json(
        responseObject({
          status: "Bad request",
          message: "Authentication failed",
          statusCode: 401,
        })
      );
    }

    //@ts-ignore
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json(
        responseObject({
          status: "Bad request",
          message: "Authentication failed",
          statusCode: 401,
        })
      );
    }

    //@ts-ignore
    const jwtToken = await encodeJWT(existingUser.id);

    return res.status(200).json(responseObject({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: jwtToken,
        user: {
          userId: existingUser?.id,
          firstName: existingUser?.firstName,
          lastName: existingUser?.lastName,
          email: existingUser?.email,
          phone: existingUser?.phone
        }
      }
    }))

  } catch (err) {
    return res.status(500).json({ message: "An error occurred!", error: err });
  }
};
