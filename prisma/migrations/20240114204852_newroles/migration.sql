/*
  Warnings:

  - Added the required column `rolesId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" INTEGER,
ADD COLUMN     "rolesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
