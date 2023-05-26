import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

type Books = {
  bookName: string;
  bookAuthor: string;
  bookPrice: string;
  available: string;
  description: string;
};
export async function POST(req: NextRequest) {
  const { bookName, bookAuthor, bookPrice, available, description }: Books =
    await req.json();
  const isAvailable = available === "true";

  await prisma.createBook.create({
    data: {
      
      bookName: bookName,
      bookAuthor: bookAuthor,
      bookPrice: parseInt(bookPrice, 10),
      available: isAvailable,
      description: description,
    },
  });
  return NextResponse.json({ message: "succussfully added book" });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (id) {
      const data = await prisma.createBook.findMany({
        where: {
          id: parseInt(id, 10),
        },
      });
      // prisma.$disconnect()
      return NextResponse.json(data);
    } else {
      const data = await prisma.createBook.findMany();
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "failed to retieve data" },
      { status: 500 }
    );
  }
}
