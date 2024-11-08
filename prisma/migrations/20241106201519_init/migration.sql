/*
  Warnings:

  - You are about to drop the column `description` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judul` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- DropIndex
DROP INDEX "User_imageId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "deskripsi" TEXT NOT NULL,
ADD COLUMN     "judul" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageId",
DROP COLUMN "name",
ADD COLUMN     "nama" TEXT NOT NULL,
ALTER COLUMN "bio" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
