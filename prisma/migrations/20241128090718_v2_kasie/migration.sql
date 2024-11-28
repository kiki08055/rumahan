/*
  Warnings:

  - The primary key for the `Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "kasir"."Transactions" DROP CONSTRAINT "Transactions_pkey",
DROP COLUMN "id",
ADD COLUMN     "transaction_id" SERIAL NOT NULL,
ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transaction_id");
