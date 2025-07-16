import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { LangchainService } from '../modules/langchain/langchain.service';
import { S3Service } from '../modules/s3/s3.service';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly langchain: LangchainService,
    private readonly s3: S3Service,
  ) {}

  async summarize(documentId: number): Promise<string> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const summary = await this.langchain.summarizeDocument(doc.fileName);
    await this.prisma.document.update({
      where: { id: documentId },
      data: { summary },
    });
    return summary;
  }

  async extractKeywords(documentId: number): Promise<string[]> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const keywords = ['keyword1', 'keyword2'];
    await this.prisma.document.update({
      where: { id: documentId },
      data: { keywords },
    });
    return keywords;
  }

  async extractTopics(documentId: number): Promise<string[]> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const topics = ['topic1', 'topic2'];
    await this.prisma.document.update({
      where: { id: documentId },
      data: { topics },
    });
    return topics;
  }

  async analyzeSentiment(documentId: number): Promise<string> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const sentiment = 'neutral';
    await this.prisma.document.update({
      where: { id: documentId },
      data: { sentiment },
    });
    return sentiment;
  }

  async detectLanguage(documentId: number): Promise<string> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const buffer = await this.s3.getFile(doc.s3Key);
    const content = buffer.toString('utf-8');
    const language = await this.langchain.detectLanguage(content);
    await this.prisma.document.update({
      where: { id: documentId },
      data: { language },
    });
    return language;
  }

  async classify(
    documentId: number,
  ): Promise<{ category: string; confidence: number }> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const category = 'general';
    const confidence = 0.95;
    await this.prisma.document.update({
      where: { id: documentId },
      data: { classification: category, confidence },
    });
    return { category, confidence };
  }

  async generateEmbeddings(documentId: number): Promise<number[]> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const embeddings = await this.langchain.generateEmbeddings(doc.fileName);
    await this.prisma.document.update({
      where: { id: documentId },
      data: { embeddings },
    });
    return embeddings;
  }

  async vectorSearch(
    query: string,
  ): Promise<{ documentId: number; score: number }[]> {
    return [{ documentId: 1, score: 0.99 }];
  }

  async extractStructured(
    documentId: number,
  ): Promise<{ tables?: string; forms?: string; metadata?: string }> {
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
    });
    if (!doc) throw new Error('Document not found');
    const tables = JSON.stringify({ table: 'stub' });
    const forms = JSON.stringify({ form: 'stub' });
    const metadata = JSON.stringify({ meta: 'stub' });
    await this.prisma.documentExtraction.upsert({
      where: { documentId },
      update: { tables, forms, metadata },
      create: { documentId, tables, forms, metadata },
    });
    return { tables, forms, metadata };
  }
}
