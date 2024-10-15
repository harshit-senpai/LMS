/*
  Warnings:

  - You are about to drop the column `isPubished` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "isPubished",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;
