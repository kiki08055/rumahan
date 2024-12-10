/*
  Warnings:

  - A unique constraint covering the columns `[code_product]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_code_product_key" ON "kasir"."products"("code_product");
