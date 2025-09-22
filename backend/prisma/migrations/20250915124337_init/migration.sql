-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "typeOfCleaning" TEXT NOT NULL,
    "renegotiate" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "gdprConsent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
