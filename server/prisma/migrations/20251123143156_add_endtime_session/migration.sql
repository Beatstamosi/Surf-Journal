/*
  Warnings:

  - Added the required column `endTime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rating" "Rating" NOT NULL;
