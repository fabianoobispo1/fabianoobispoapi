-- CreateTable
CREATE TABLE "fa_transacao" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "id_FaUsuario" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fa_transacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fa_transacao" ADD CONSTRAINT "fa_transacao_id_FaUsuario_fkey" FOREIGN KEY ("id_FaUsuario") REFERENCES "fa_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
