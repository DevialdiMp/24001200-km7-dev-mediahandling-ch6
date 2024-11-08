/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropIndex
DROP INDEX "Image_userId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "imageId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_imageId_key" ON "User"("imageId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
