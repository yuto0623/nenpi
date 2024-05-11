import prisma from "@/lib/PrismaClient";
import { PrismaClient } from "@prisma/client";
import type { NextRequest, NextResponse } from "next/server";


export async function GET(
  Request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = new PrismaClient();
  const id = params.id;
  const response = await prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      settings: true
    }
  })
  if (!response?.settings[0]) {
    const response = await prisma.settings.create({
      data: {
        userId: id
      }
    })
    return new Response(JSON.stringify(response))
  }
  return new Response(JSON.stringify(response?.settings[0]))
}


export async function PATCH(
  Request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = new PrismaClient();
  const id = params.id;
  const body = await Request.json();
  const response = await prisma.settings.update({
    where: {
      userId: id
    },
    data: {
      mileage: Number(body.mileage)
    }
  })
  // console.log(response)
  if (!response) {
    const response = await prisma.settings.create({
      data: {
        userId: id,
        mileage: Number(body.mileage)
      }
    })
    return new Response(JSON.stringify(response))
  }
  return new Response(JSON.stringify(response))
}