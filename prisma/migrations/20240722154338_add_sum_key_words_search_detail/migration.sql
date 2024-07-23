/*
  Warnings:

  - Added the required column `sumKeyWords` to the `SearchDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchDetail" ADD COLUMN     "sumKeyWords" INTEGER NOT NULL;
