import prisma from "@/lib/PrismaClient";
import type { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await prisma.user.findMany(
    {
      include: {
        userData:{
        include: {
        dataList: {
          orderBy: {
            created_at: "desc"
          }
        }
        }
      }
      }
    }
  );
  return new Response(JSON.stringify(response));
}