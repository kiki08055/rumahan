/*
  Warnings:

  - Added the required column `code_product` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kasir"."products" ADD COLUMN     "code_product" TEXT NOT NULL;
