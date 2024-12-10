-- AlterTable
ALTER TABLE "kasir"."Transactions" ADD COLUMN     "total_product" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "kasir"."products" ADD COLUMN     "expire_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "upcoming_product" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
