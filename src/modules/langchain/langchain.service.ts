import { Injectable } from '@nestjs/common';
import { LanguageAgent } from './agents/language.agent';
import { KeywordsAgent } from './agents/keywords.agent';

@Injectable()
export class LangchainService {
  constructor(
    private readonly languageAgent: LanguageAgent,
    private readonly keywordsAgent: KeywordsAgent,
  ) {}

  summarizeDocument(_content: string): Promise<string> {
    return Promise.resolve('Summary (stub)');
  }

  classifyDocument(_content: string): Promise<string> {
    return Promise.resolve('Classification (stub)');
  }

  extractMetadata(_content: string): Promise<Record<string, any>> {
    return Promise.resolve({ language: 'en', tags: ['stub'] });
  }

  generateEmbeddings(_content: string): Promise<number[]> {
    return Promise.resolve([0.1, 0.2, 0.3]);
  }

  searchDocuments(_query: string): Promise<any[]> {
    return Promise.resolve([]);
  }

  async detectKeywords(
    fileBuffer: Buffer,
    mimeType: string,
  ): Promise<string[]> {
    return this.keywordsAgent.extract(fileBuffer, mimeType);
  }

  async detectLanguage(fileBuffer: Buffer, mimeType: string): Promise<string> {
    return this.languageAgent.extract(fileBuffer, mimeType);
  }
}
