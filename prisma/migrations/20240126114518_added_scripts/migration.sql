-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PERMISSIONS" ADD VALUE 'CREATE_SCRIPTS';
ALTER TYPE "PERMISSIONS" ADD VALUE 'EDIT_SCRIPTS';
ALTER TYPE "PERMISSIONS" ADD VALUE 'DELETE_SCRIPTS';
ALTER TYPE "PERMISSIONS" ADD VALUE 'MANAGE_LICENSES';
ALTER TYPE "PERMISSIONS" ADD VALUE 'VIEW_CUSTOMERS';
ALTER TYPE "PERMISSIONS" ADD VALUE 'BAN_CUSTOMERS';

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShopPermissions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "permissions" "PERMISSIONS"[],

    CONSTRAINT "UserShopPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "script_id" INTEGER NOT NULL,
    "ips" TEXT[],

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "License_user_id_script_id_idx" ON "License"("user_id", "script_id");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShopPermissions" ADD CONSTRAINT "UserShopPermissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShopPermissions" ADD CONSTRAINT "UserShopPermissions_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_script_id_fkey" FOREIGN KEY ("script_id") REFERENCES "Script"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
