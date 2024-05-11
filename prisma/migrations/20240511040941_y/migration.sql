/*
  Warnings:

  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_userId_fkey";

-- DropTable
DROP TABLE "settings";

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
