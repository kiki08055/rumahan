-- AlterTable
ALTER TABLE "kasir"."kasir" ADD COLUMN     "password" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "refresh_token" TEXT DEFAULT '',
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
