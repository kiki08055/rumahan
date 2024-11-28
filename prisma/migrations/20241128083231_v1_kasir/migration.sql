-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "kasir";

-- CreateTable
CREATE TABLE "kasir"."Transactions" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "productId" INTEGER NOT NULL,
    "kasirId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kasir"."products" (
    "product_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "kasir"."kasir" (
    "kasir_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "kasir_pkey" PRIMARY KEY ("kasir_id")
);

-- CreateTable
CREATE TABLE "kasir"."customer" (
    "customer_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- AddForeignKey
ALTER TABLE "kasir"."Transactions" ADD CONSTRAINT "Transactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "kasir"."products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kasir"."Transactions" ADD CONSTRAINT "Transactions_kasirId_fkey" FOREIGN KEY ("kasirId") REFERENCES "kasir"."kasir"("kasir_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kasir"."Transactions" ADD CONSTRAINT "Transactions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "kasir"."customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
