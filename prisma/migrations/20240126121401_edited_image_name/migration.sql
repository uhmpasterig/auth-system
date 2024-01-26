/*
  Warnings:

  - You are about to drop the column `logo` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "logo",
ADD COLUMN     "image" TEXT;
