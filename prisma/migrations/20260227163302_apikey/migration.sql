/*
  Warnings:

  - Added the required column `apiKey` to the `api_keys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_keys" ADD COLUMN     "apiKey" TEXT NOT NULL;
