-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_parentCommentId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `parentCommentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentCommentId_fkey` FOREIGN KEY (`parentCommentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
