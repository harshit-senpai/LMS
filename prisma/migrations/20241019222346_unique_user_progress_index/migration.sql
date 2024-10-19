/*
  Warnings:

  - A unique constraint covering the columns `[chapterId,userId]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserProgress_chapterId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_chapterId_userId_key" ON "UserProgress"("chapterId", "userId");
