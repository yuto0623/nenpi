/*
  Warnings:

  - You are about to drop the column `testtext` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "testtext",
ADD COLUMN     "mileage" INTEGER;
