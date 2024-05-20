import prisma from "@/lib/PrismaClient";
import type { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, res: NextResponse,
  { params }: { params: { id: string } }
) {
  // const body = await req.json();
  try {
    // const id = await req.nextUrl.searchParams.get("id");
    const id = await params.id;
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