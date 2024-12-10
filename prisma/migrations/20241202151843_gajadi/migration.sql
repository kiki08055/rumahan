/*
  Warnings:

  - The `upcoming_product` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "kasir"."products" DROP COLUMN "upcoming_product",
ADD COLUMN     "upcoming_product" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
