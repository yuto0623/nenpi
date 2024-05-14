/*
  Warnings:

  - You are about to drop the column `fuelEfficiency` on the `UserData` table. All the data in the column will be lost.
  - You are about to drop the column `gas` on the `UserData` table. All the data in the column will be lost.
  - You are about to drop the column `gasPrice` on the `UserData` table. All the data in the column will be lost.
  - You are about to drop the `Mileage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mileage" DROP CONSTRAINT "Mileage_userDataId_fkey";

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "fuelEfficiency",
DROP COLUMN "gas",
DROP COLUMN "gasPrice";

-- DropTable
DROP TABLE "Mileage";

-- CreateTable
CREATE TABLE "DataList" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "gas" INTEGER NOT NULL DEFAULT 0,
    "gasPrice" INTEGER NOT NULL DEFAULT 0,
    "fuelEfficiency" INTEGER NOT NULL DEFAULT 0,
    "userDataId" INTEGER,

    CONSTRAINT "DataList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataList_userDataId_key" ON "DataList"("userDataId");

-- AddForeignKey
ALTER TABLE "DataList" ADD CONSTRAINT "DataList_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
