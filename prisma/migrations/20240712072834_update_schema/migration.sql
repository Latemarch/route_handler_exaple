/*
  Warnings:

  - You are about to drop the column `group_code` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `group_name` on the `Group` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `end_time` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_member` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_superamin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupCode]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupName]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupCode` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupName` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCount` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Group_group_code_key` ON `Group`;

-- AlterTable
ALTER TABLE `Group` DROP COLUMN `group_code`,
    DROP COLUMN `group_name`,
    ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `groupCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `groupName` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Note` ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `createdBy` INTEGER NOT NULL,
    ADD COLUMN `userCount` INTEGER NOT NULL,
    MODIFY `progress` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` ENUM('error', 'complete', 'pending') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `end_time`,
    DROP COLUMN `start_time`,
    ADD COLUMN `companyId` INTEGER NULL,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `is_active`,
    DROP COLUMN `is_admin`,
    DROP COLUMN `is_member`,
    DROP COLUMN `is_superamin`,
    DROP COLUMN `last_login`,
    ADD COLUMN `companyId` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isMember` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isSuperamin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastLogin` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Group_groupCode_key` ON `Group`(`groupCode`);

-- CreateIndex
CREATE UNIQUE INDEX `Group_groupName_key` ON `Group`(`groupName`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
