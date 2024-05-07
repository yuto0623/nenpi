import prisma from "@/lib/PrismaClient";
import { PrismaClient } from "@prisma/client";

// export async function GET() {
//   return await prisma.user.findMany();
// }

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users));
  } finally {
    await prisma.$disconnect();
  }
}