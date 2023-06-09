import { signJWT } from "@/app/lib/token";
// import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/app/lib/prisma";
import { getEnvVariable, getErrorResponse } from "@/app/lib/helper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || !(await compare(body.password, user.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.id.toString() },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(Date.now() + parseInt(JWT_EXPIRES_IN) * 60 * 1000),
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await response.cookies.set(cookieOptions);

    return response;
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}
