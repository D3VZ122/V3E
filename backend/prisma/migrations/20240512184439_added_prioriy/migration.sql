/*
  Warnings:

  - Added the required column `Due_at` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriorityTask" AS ENUM ('Low', 'Medium', 'Hard');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "Due_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Priority" "PriorityTask" NOT NULL DEFAULT 'Low';
