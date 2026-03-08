/*
  Warnings:

  - You are about to drop the `EmailTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailTemplate" DROP CONSTRAINT "EmailTemplate_createdBy_fkey";

-- DropTable
DROP TABLE "EmailTemplate";

-- CreateTable
CREATE TABLE "email_template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "requiredFields" JSONB NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "email_template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_template" ADD CONSTRAINT "email_template_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
