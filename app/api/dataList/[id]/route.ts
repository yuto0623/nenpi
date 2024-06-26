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
      // mileageIncrement: Number(body.mileageIncrement),
      fuelEfficiency: Number(body.mileage) / Number(body.gas),
      gasPrice: Number(body.gasPrice),
      gas: Number(body.gas),
      ...(body.location && { latitude: body.location.latitude, longitude: body.location.longitude }),
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
            // mileageIncrement: Number(body.mileageIncrement),
            fuelEfficiency: Number(body.mileage) / Number(body.gas),
            gasPrice: Number(body.gasPrice),
            gas: Number(body.gas),
            ...(body.Location && { latitude: body.Location.latitude, longitude: body.Location.longitude }),

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
            // mileageIncrement: 0,
            fuelEfficiency: 0,
            gasPrice: 0,
            gas: 0
          }
        }
      },
      include: {
        dataList: true
      }
    })
    return new Response(JSON.stringify(response?.dataList))
  }
  // console.log(response?.dataList)
  return new Response(JSON.stringify(response?.dataList))
}


export async function DELETE(
  Request: NextRequest,
  { params }: { params: { id: string } }
) {
  // console.log(params)
  const id = params.id;
  // const response = await prisma.dataList.findUnique({
  //   where: {
  //     id: Number(id)
  //   },
  // })
  await prisma.dataList.delete({
    where: {
      id: Number(id)
    },
  })
  return new Response(JSON.stringify({status: "success"}))
  // console.log(response?.dataList)
}


export async function PUT(
  Request: NextRequest,
  { params }: {params: {id: string}}
){
  const id = params.id;
  const body = await Request.json();

  await prisma.dataList.update({
    where: {
      id: Number(id)
    },
    data: {
      mileage: Number(body.mileage),
      // mileageIncrement: Number(body.mileageIncrement),
      gasPrice:  Number(body.gasPrice),
      gas:  Number(body.gas)
    },
  })
  return new Response(JSON.stringify({status: "success"}))
}
