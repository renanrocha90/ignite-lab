/*
  Warnings:

  - You are about to drop the column `cancaleddAt` on the `Enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "cancaleddAt",
ADD COLUMN     "canceleddAt" TIMESTAMP(3);
