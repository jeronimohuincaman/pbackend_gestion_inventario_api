-- CreateTable
CREATE TABLE "Usuario" (
    "idusuario" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idrol" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "Rol" (
    "idrol" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "superadmin" BOOLEAN NOT NULL,
    "alta" BOOLEAN NOT NULL,
    "baja" BOOLEAN NOT NULL,
    "modificacion" BOOLEAN NOT NULL,
    "consulta" BOOLEAN NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("idrol")
);

-- CreateTable
CREATE TABLE "Producto" (
    "idproducto" SERIAL NOT NULL,
    "codigo_interno" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("idproducto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idrol_fkey" FOREIGN KEY ("idrol") REFERENCES "Rol"("idrol") ON DELETE RESTRICT ON UPDATE CASCADE;
