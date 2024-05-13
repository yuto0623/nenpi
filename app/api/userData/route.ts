import { PrismaClient } from "@prisma/client";
import type { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  try {
  const body = await req.json()

  await prisma.user.update({
    where: {
      id: body.id
    },
    data: {
      userData: body.mileage
    }
  })
  return new Response(JSON.stringify(body));
  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }finally {
   await prisma.$disconnect();
 }
}