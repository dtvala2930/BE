/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YtbLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_from_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_linkId_fkey";

-- DropForeignKey
ALTER TABLE "YtbLink" DROP CONSTRAINT "YtbLink_userId_fkey";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "YtbLink";

-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchDetail" (
    "id" SERIAL NOT NULL,
    "fileId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "SearchDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Search_fileId_key" ON "Search"("fileId");

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchDetail" ADD CONSTRAINT "SearchDetail_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Search"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
