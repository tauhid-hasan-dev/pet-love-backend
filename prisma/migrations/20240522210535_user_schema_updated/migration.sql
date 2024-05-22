/*
  Warnings:

  - You are about to drop the column `medicalHistory` on the `pets` table. All the data in the column will be lost.
  - Added the required column `healthStatus` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('BLOCKED', 'ACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "medicalHistory",
ADD COLUMN     "healthStatus" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
