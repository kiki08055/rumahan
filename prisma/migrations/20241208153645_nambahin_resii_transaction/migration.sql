/*
  Warnings:

  - You are about to drop the `Resi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "kasir"."Resi";

-- CreateTable
CREATE TABLE "kasir"."Receipt" (
    "receipt_id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" TEXT NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("receipt_id")
);

-- AddForeignKey
ALTER TABLE "kasir"."Receipt" ADD CONSTRAINT "Receipt_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "kasir"."Transactions"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
