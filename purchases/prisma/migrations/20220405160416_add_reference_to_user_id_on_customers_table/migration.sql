/*
  Warnings:

  - The values [APPORVED] on the enum `PurchaseStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[authuserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PurchaseStatus_new" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED');
ALTER TABLE "Purchase" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Purchase" ALTER COLUMN "status" TYPE "PurchaseStatus_new" USING ("status"::text::"PurchaseStatus_new");
ALTER TYPE "PurchaseStatus" RENAME TO "PurchaseStatus_old";
ALTER TYPE "PurchaseStatus_new" RENAME TO "PurchaseStatus";
DROP TYPE "PurchaseStatus_old";
ALTER TABLE "Purchase" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "authuserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authuserId_key" ON "Customer"("authuserId");
