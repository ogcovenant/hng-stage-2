import request from "supertest";
import app from "../app";
import db from "../common/config/dbconfig";
import { generateUser, generateUserInfo } from "../common/helpers/generateUser";

let $user: any;

describe("Signup", () => {
  $user = generateUserInfo();
  const res = request(app).post("/auth/register").send($user);
  it("should register user and automatically generate default organisation", async () => {
    const response = await res;

    expect(response.status).toEqual(201);
    expect(await response.body).toHaveProperty("status", "success");
  });

  it("Verify the default organisation name is correctly generated ", async () => {
    const orgName = `${$user.firstName}'s Organisation`;
    const org = await db.organisation.findFirst({
      where: {
        name: orgName,
      },
    });
    expect(org).not.toBeUndefined();
  });

  it("should check the signup response data", async () => {
    const response = await res;

    expect(response.body.data.user).toHaveProperty(
      "firstName",
      $user.firstName
    );
    expect(response.body.data.user).toHaveProperty("lastName", $user.lastName);
    expect(response.body.data.user).toHaveProperty("email", $user.email);
    expect(response.body.data.accessToken).not.toBeUndefined();
  });

  it("should return an error if firstName parameter is missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        lastName: $user.lastName,
        email: $user.email,
        password: $user.password,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });

  it("should return an error if lastName parameter is missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        firstName: $user.firstName,
        email: $user.email,
        password: $user.password,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });

  it("should return an error if email parameter is missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        firstName: $user.firstName,
        lastName: $user.lastName,
        password: $user.password,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });

  it("should return an error if password parameter is missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        firstName: $user.firstName,
        lastName: $user.lastName,
        email: $user.email,
      })
      .expect(422);
    expect(res.body.errors[0].message).toBe("Invalid value");
  });

  it("should return an error if email already exists", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        firstName: $user.firstName,
        lastName: $user.lastName,
        email: $user.email,
        password: $user.password,
      })
      .expect(400);
  });
});

describe("Login", () => {
  it("Should Log the user in successfully", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: $user.email,
        password: $user.password,
      })
      .expect(200);
  });

  it("Should generate an error for incorrect password", async () => {
    await request(app)
      .post("/auth/login")
      .send({
        email: $user.email,
        password: "INCORRECT",
      })
      .expect(401);
  });

  it("should check the login response data", async () => {
    const res = await request(app).post("/auth/login").send({
      email: $user.email,
      password: $user.password,
    });

    expect(res.body.data.user).toHaveProperty("firstName", $user.firstName);
    expect(res.body.data.user).toHaveProperty("lastName", $user.lastName);
    expect(res.body.data.user).toHaveProperty("email", $user.email);
    expect(res.body.data.accessToken).not.toBeUndefined();
  });
});
