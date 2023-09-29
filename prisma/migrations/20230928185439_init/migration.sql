-- CreateTable
CREATE TABLE "Planet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "terrain" TEXT NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);
