-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_authorEmail_fkey";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
