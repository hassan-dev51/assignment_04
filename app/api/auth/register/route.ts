import { getErrorResponse } from "@/app/lib/helper";
import prisma from "@/app/lib/prisma";

import { hash } from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hashedPassword = await hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        delieveryAddress: body.delieveryAddress,
      },
    });
    return NextResponse.json(
      {
        data: { user: { ...user, password: undefined } },
      },
      { status: 200, headers: { "Content-type": "application/json" } }
    );
  } catch (error: any) {
    return getErrorResponse(500, error.message);
  }
}
