/*
  Warnings:

  - You are about to drop the `TransactionItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "kasir"."TransactionItems" DROP CONSTRAINT "TransactionItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "kasir"."TransactionItems" DROP CONSTRAINT "TransactionItems_transactionId_fkey";

-- DropTable
DROP TABLE "kasir"."TransactionItems";
