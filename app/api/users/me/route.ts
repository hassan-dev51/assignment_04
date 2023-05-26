import { getErrorResponse } from "@/app/lib/helper";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");
  console.log(userId, "use id");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access this error is in get method me route"
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  return NextResponse.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
}
