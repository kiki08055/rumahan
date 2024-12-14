-- CreateTable
CREATE TABLE "kasir"."TransactionItems" (
    "transactionItemId" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "productId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "TransactionItems_pkey" PRIMARY KEY ("transactionItemId")
);

-- AddForeignKey
ALTER TABLE "kasir"."TransactionItems" ADD CONSTRAINT "TransactionItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "kasir"."products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kasir"."TransactionItems" ADD CONSTRAINT "TransactionItems_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "kasir"."Transactions"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
