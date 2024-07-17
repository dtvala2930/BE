/*
  Warnings:

  - Added the required column `userId` to the `SearchDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchDetail" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SearchDetail" ADD CONSTRAINT "SearchDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
