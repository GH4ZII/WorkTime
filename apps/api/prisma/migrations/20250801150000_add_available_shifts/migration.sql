-- AlterTable
ALTER TABLE "Shift" ADD COLUMN "isAvailableShift" BOOLEAN NOT NULL DEFAULT false;

-- Make userId optional
ALTER TABLE "Shift" ALTER COLUMN "userId" DROP NOT NULL;
