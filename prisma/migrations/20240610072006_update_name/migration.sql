/*
  Warnings:

  - You are about to drop the column `created_at` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `end_day` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `start_day` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ip_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - Added the required column `endDay` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDay` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipAddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "created_at",
DROP COLUMN "end_day",
DROP COLUMN "room_id",
DROP COLUMN "start_day",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDay" INTEGER NOT NULL,
ADD COLUMN     "roomId" INTEGER NOT NULL,
ADD COLUMN     "startDay" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "first_name",
DROP COLUMN "ip_address",
DROP COLUMN "last_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
