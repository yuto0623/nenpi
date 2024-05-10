/*
  Warnings:

  - You are about to drop the `UserData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_userId_fkey";

-- DropTable
DROP TABLE "UserData";
