import prisma from "@/lib/PrismaClient";
import type { NextRequest, NextResponse } from "next/server";


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
      dataList: {
        orderBy:{
          created_at: "desc"
        }
      },
    }
  })
  if (!response) {
    const response = await prisma.userData.create({
      data: {
        userId: id,
      },
    })
    return new Response(JSON.stringify(response))
  }
  // console.log(response)
  return new Response(JSON.stringify(response))
}


// export async function PATCH(
//   Request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   const body = await Request.json();
//   const response = await prisma.userData.update({
//     where: {
//       userId: id
//     },
//     data: {
//       mileage: Number(body.mileage),
//       gasPrice: Number(body.gasPrice),
//       gas: Number(body.gas)
//     }
//   })
//   // console.log(response)
//   if (!response) {
//     const response = await prisma.userData.create({
//       data: {
//         userId: id,
//         mileage: Number(body.mileage),
//         gasPrice: Number(body.gasPrice),
//         gas: Number(body.gas)
//       }
//     })
//     return new Response(JSON.stringify(response))
//   }
//   return new Response(JSON.stringify(response))
// }