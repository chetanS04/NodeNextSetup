/*
  Warnings:

  - You are about to drop the column `prince` on the `products` table. All the data in the column will be lost.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `prince`,
    ADD COLUMN `price` VARCHAR(10) NOT NULL;
