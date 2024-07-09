-- CreateTable
CREATE TABLE "YtbLink" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YtbLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "from" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_linkId_key" ON "Notification"("linkId");

-- AddForeignKey
ALTER TABLE "YtbLink" ADD CONSTRAINT "YtbLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "YtbLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
