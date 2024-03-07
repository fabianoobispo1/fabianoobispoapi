/*
  Warnings:

  - You are about to drop the column `id_FaUsuario` on the `fa_transacao` table. All the data in the column will be lost.
  - Added the required column `faUsuario_id` to the `fa_transacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fa_transacao" DROP CONSTRAINT "fa_transacao_id_FaUsuario_fkey";

-- AlterTable
ALTER TABLE "fa_transacao" DROP COLUMN "id_FaUsuario",
ADD COLUMN     "faUsuario_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "fa_transacao" ADD CONSTRAINT "fa_transacao_faUsuario_id_fkey" FOREIGN KEY ("faUsuario_id") REFERENCES "fa_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
