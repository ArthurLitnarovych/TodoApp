/*
  Warnings:

  - Added the required column `authorEmail` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
