/*
  Warnings:

  - You are about to drop the column `slu` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_slu_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "slu",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
