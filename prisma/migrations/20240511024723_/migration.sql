/*
  Warnings:

  - The primary key for the `settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `settings` table. All the data in the column will be lost.
  - The `id` column on the `settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- DropIndex
DROP INDEX "settings_email_key";

-- AlterTable
ALTER TABLE "settings" DROP CONSTRAINT "settings_pkey",
DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "mileage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "settings_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Settings";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
