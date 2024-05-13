/*
  Warnings:

  - You are about to drop the column `mileage` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "mileage";

-- CreateTable
CREATE TABLE "UserData" (
    "id" SERIAL NOT NULL,
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "prices" INTEGER NOT NULL DEFAULT 0,
    "fuelEfficiency" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_userId_key" ON "UserData"("userId");

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
