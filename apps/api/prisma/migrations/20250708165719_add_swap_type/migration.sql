-- CreateEnum
CREATE TYPE "SwapRequestType" AS ENUM ('GIVE_AWAY', 'SWAP');

-- DropForeignKey
ALTER TABLE "ShiftSwapRequest" DROP CONSTRAINT "ShiftSwapRequest_swapWithId_fkey";

-- DropForeignKey
ALTER TABLE "ShiftSwapRequest" DROP CONSTRAINT "ShiftSwapRequest_toShiftId_fkey";

-- AlterTable
ALTER TABLE "ShiftSwapRequest" ADD COLUMN     "reason" TEXT,
ADD COLUMN     "swapType" "SwapRequestType" NOT NULL DEFAULT 'SWAP',
ALTER COLUMN "swapWithId" DROP NOT NULL,
ALTER COLUMN "toShiftId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ShiftSwapRequest" ADD CONSTRAINT "ShiftSwapRequest_swapWithId_fkey" FOREIGN KEY ("swapWithId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftSwapRequest" ADD CONSTRAINT "ShiftSwapRequest_toShiftId_fkey" FOREIGN KEY ("toShiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
