/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `kasir` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "kasir"."kasir" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "refresh_token" TEXT DEFAULT '',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "kasir_email_key" ON "kasir"."kasir"("email");
