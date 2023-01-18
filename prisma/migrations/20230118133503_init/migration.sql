-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brief" TEXT,
ALTER COLUMN "userId" SET DEFAULT 'guest',
ALTER COLUMN "categoryId" SET DEFAULT 'newArrival';
