/*
  Warnings:

  - You are about to drop the column `image` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "image",
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "url";

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "Image"("userId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
