-- AlterTable
ALTER TABLE "Meeting" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Meeting_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";
