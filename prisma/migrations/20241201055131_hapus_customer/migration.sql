/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "kasir"."Transactions" DROP CONSTRAINT "Transactions_customerId_fkey";

-- DropTable
DROP TABLE "kasir"."customer";
