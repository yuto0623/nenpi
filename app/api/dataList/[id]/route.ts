import prisma from "@/lib/PrismaClient";
import type { NextRequest } from "next/server";

export async function POST(
  Request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await Request.json();
  // console.log(body)
  const user = await prisma.userData.findUnique({
    where: {
      userId: id
    },
  })

  const response = await prisma.dataList.create({
    data: {
      userDataId: user?.id,
      mileage: Number(body.mileage),
      gasPrice: Number(body.gasPrice),
      gas: Number(body.gas)
    }
  })


  // console.log(response)
  if (!response) {
    const response = await prisma.userData.create({
    data: {
      userId: id,
      dataList: {
        create: {
            mileage: Number(body.mileage),
            gasPrice: Number(body.gasPrice),
            gas: Number(body.gas)
        }
      }
    },
    include: {
      dataList: true
    }
    })
    return new Response(JSON.stringify(response))
  }
  return new Response(JSON.stringify(response))
}




export async function GET(
  Request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const response = await prisma.userData.findUnique({
    where: {
      userId: id
    },
    include: {
      dataList: true
    }
  })
  if (!response?.dataList) {
    // console.log("create")
  await prisma.userData.create({
    data: {
      userId: id,
      dataList: {
        create: {
            mileage: 0,
            gasPrice: 0,
            gas: 0
        }
      }
    },
    include: {
      dataList: true
    }
  })	
  }
  // console.log(response?.dataList)
  return new Response(JSON.stringify(response?.dataList))
}