-- CreateTable
CREATE TABLE "kasir"."Resi" (
    "resi_id" SERIAL NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "shippingMethod" TEXT NOT NULL,
    "shippingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resi_pkey" PRIMARY KEY ("resi_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resi_trackingNumber_key" ON "kasir"."Resi"("trackingNumber");
