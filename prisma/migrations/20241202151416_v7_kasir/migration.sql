-- AlterTable
ALTER TABLE "kasir"."products" ALTER COLUMN "upcoming_product" DROP DEFAULT,
ALTER COLUMN "upcoming_product" SET DATA TYPE TEXT;
