import db from "../common/config/dbconfig";
import { encodeJWT, decodeJWT } from "../common/utils/jwt";

let user: any;

beforeAll(async () => {
  user = await db.user.create({
    data: {
      firstName: "Covenant",
      lastName: "Ogowale",
      email: "justcovenant@gmail.com",
      password: "12345678",
      phone: "12345678900",
    },
  });
});

afterAll(async () => {
  await db.user.delete({
    where: {
      //@ts-ignore
      id: user.id,
    },
  });
});

describe("generate an access token", () => {
  it("should generate a correctly expiring access token", async () => {
    //@ts-ignore
    const token = await encodeJWT(user.id, "2s");

    const result = await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const decoded = await decodeJWT(token);
          //@ts-ignore
          resolve(decoded.id);
        } catch (err) {
          resolve(null);
        }
      }, 2100);
    });

    expect(result).toBeNull();
  });
});

describe("decode the access token data", () => {
  it("should decode the access token data", async () => {
    //@ts-ignore
    const token = await encodeJWT(user.id, "7d");

    //@ts-ignore
    const decoded = await decodeJWT(token);

    //@ts-ignore
    expect(decoded.id).not.toBeNull();
    //@ts-ignore
    expect(decoded.id).toBe(user.id);
  });
});
