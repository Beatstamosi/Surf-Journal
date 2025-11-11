/*
  Warnings:

  - You are about to drop the column `date` on the `Session` table. All the data in the column will be lost.
  - Made the column `startTime` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionMatchForecast` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `forecastId` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `boardId` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_boardId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_forecastId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "date",
ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "sessionMatchForecast" SET NOT NULL,
ALTER COLUMN "forecastId" SET NOT NULL,
ALTER COLUMN "boardId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_forecastId_fkey" FOREIGN KEY ("forecastId") REFERENCES "Forecast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
