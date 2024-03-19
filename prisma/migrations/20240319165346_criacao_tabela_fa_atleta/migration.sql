-- CreateEnum
CREATE TYPE "TipoAtleta" AS ENUM ('ATAQUE', 'DEFESA', 'ST');

-- CreateTable
CREATE TABLE "fa_atleta" (
    "id" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoAtleta" NOT NULL,
    "posicao" TEXT NOT NULL,
    "numero" DECIMAL(65,30) NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "pesso" DOUBLE PRECISION NOT NULL,
    "faUsuarioId" TEXT NOT NULL,

    CONSTRAINT "fa_atleta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fa_atleta_faUsuarioId_key" ON "fa_atleta"("faUsuarioId");

-- AddForeignKey
ALTER TABLE "fa_atleta" ADD CONSTRAINT "fa_atleta_faUsuarioId_fkey" FOREIGN KEY ("faUsuarioId") REFERENCES "fa_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
