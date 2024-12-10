/*
  Warnings:

  - You are about to drop the column `password` on the `kasir` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `kasir` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `kasir` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "kasir"."kasir" DROP COLUMN "password",
DROP COLUMN "refresh_token",
DROP COLUMN "role";
