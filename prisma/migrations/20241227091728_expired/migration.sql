-- AlterTable
ALTER TABLE "kasir"."products" ALTER COLUMN "expire_date" DROP NOT NULL,
ALTER COLUMN "expire_date" DROP DEFAULT;
