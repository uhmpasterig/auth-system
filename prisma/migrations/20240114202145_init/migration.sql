-- CreateEnum
CREATE TYPE "PERMISSIONS" AS ENUM ('OWNER', 'VIEW_USER', 'DELETE_USER', 'EDIT_USER', 'VIEW_ALL_USERS', 'BAN_USER', 'UNBAN_USER');

-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "email" VARCHAR(75) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "permissions" "PERMISSIONS"[],
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "avatar_url" VARCHAR(255),
    "bio" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
