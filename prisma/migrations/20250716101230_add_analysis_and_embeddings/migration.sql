-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "classification" TEXT,
ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "embeddings" JSONB,
ADD COLUMN     "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "language" TEXT,
ADD COLUMN     "sentiment" TEXT,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "topics" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "DocumentExtraction" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "tables" JSONB,
    "forms" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DocumentExtraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentExtraction_documentId_key" ON "DocumentExtraction"("documentId");

-- AddForeignKey
ALTER TABLE "DocumentExtraction" ADD CONSTRAINT "DocumentExtraction_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
