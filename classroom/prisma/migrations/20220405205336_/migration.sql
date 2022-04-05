/*
  Warnings:

  - You are about to drop the column `canceleddAt` on the `Enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "canceleddAt",
ADD COLUMN     "canceledAt" TIMESTAMP(3);
