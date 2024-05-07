import { PrismaClient } from "@prisma/client";
import type { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique(
      {where: {id: body.id}}
    );
    return new Response(JSON.stringify(user));
  } catch (e) {
    return new Response(JSON.stringify(e));
  } 
  finally {
    await prisma.$disconnect();
  }
}
