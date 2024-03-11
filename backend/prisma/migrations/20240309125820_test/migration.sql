/*
  Warnings:

  - You are about to alter the column `fullCnt` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(4000)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `fullCnt` JSON NULL;
