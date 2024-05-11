/*
  Warnings:

  - Made the column `mileage` on table `Settings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "mileage" SET NOT NULL,
ALTER COLUMN "mileage" SET DEFAULT 0,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
