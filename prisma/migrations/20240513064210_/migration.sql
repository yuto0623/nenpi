/*
  Warnings:

  - You are about to drop the column `prices` on the `UserData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "prices",
ADD COLUMN     "gasPrice" INTEGER NOT NULL DEFAULT 0;
