/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "color" VARCHAR(20),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "name" VARCHAR(25) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_name_key" ON "Shop"("name");
