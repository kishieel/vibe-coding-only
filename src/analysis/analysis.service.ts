import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { LangchainService } from 'src/modules/langchain/langchain.service';
import { S3Service } from 'src/modules/s3/s3.service';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly langchain: LangchainService,
    private readonly s3: S3Service,
  ) {}

  async process(documentId: number): Promise<void> {
    const document = await this.prisma.document.findUniqueOrThrow({
      where: { id: documentId },
    });

    const file = await this.s3.getFile(document.s3Key);

    const [language, keywords] = await Promise.all([
      this.langchain.detectLanguage(file, document.mimeType),
      this.langchain.detectKeywords(file, document.mimeType),
    ]);

    console.log(`Detected language for document ${documentId}: ${language}`);
    console.log(
      `Detected keywords for document ${documentId}: ${keywords.join(', ')}`,
    );

    await this.prisma.document.update({
      where: { id: documentId },
      data: { status: 'READY' },
    });
  }
}
