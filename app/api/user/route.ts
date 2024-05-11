import { PrismaClient } from "@prisma/client";
import type { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  // const body = await req.json();
  try {
    const id = await req.nextUrl.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }
    const user = await prisma.user.findUnique(
      { where: { id: id } }
    );
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// export async function PUT(req: NextRequest, res: NextResponse) {
//   const prisma = new PrismaClient();
//   try {
//   const body = await req.json()

//   await prisma.user.update({
//     where: {
//       id: body.id
//     },
//     data: {
//       mileage: Number(body.mileage)
//     }
//   })
//   return new Response(JSON.stringify(body));
//   } catch (e) {
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
//   }finally {
//    await prisma.$disconnect();
//  }
// }