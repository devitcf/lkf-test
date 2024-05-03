-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveRefreshToken" (
    "jti" TEXT NOT NULL,
    "sub" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveRefreshToken_jti_key" ON "ActiveRefreshToken"("jti");

-- AddForeignKey
ALTER TABLE "ActiveRefreshToken" ADD CONSTRAINT "ActiveRefreshToken_sub_fkey" FOREIGN KEY ("sub") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
