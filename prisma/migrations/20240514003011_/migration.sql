/*
  Warnings:

  - You are about to drop the column `mileage` on the `UserData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "mileage";

-- CreateTable
CREATE TABLE "Mileage" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "userDataId" INTEGER,

    CONSTRAINT "Mileage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mileage_userDataId_key" ON "Mileage"("userDataId");

-- AddForeignKey
ALTER TABLE "Mileage" ADD CONSTRAINT "Mileage_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
