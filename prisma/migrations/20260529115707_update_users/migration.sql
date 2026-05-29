-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT,
ALTER COLUMN "password_hash" DROP NOT NULL,
ALTER COLUMN "is_verified" SET DEFAULT false;
