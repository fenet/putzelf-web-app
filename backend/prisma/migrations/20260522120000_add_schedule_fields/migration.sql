-- Add schedule integration fields
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "preferredWorkerCode" TEXT;
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "adminShiftId" INTEGER;
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "confirmedAt" TIMESTAMP(3);
