import { SignJWT, jwtVerify } from "jose";
import { getEnvVariable } from "./helper";

//when we call this function at the user login time , it will generate jwt token , it has all built in methods , so we have to follow that

export const signJWT = async (
  payload: { sub: string },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"));
    const alg = "HS256";
    return await new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    // console.log("error while generating token", error);
    throw error;
  }
};

//now we create a function to verify the jwt token
export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as T;
  } catch (error) {
    console.log(error, "error in verifying");
    throw new Error("Your token has expired.");
  }
};
