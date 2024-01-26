-- DropEnum
DROP TYPE "ROLES";

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "roleIndex" INTEGER NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "permissions" "PERMISSIONS"[],

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_roleIndex_key" ON "Roles"("roleIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");
