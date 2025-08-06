import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';

@Injectable()
export class KeywordsAgent {
  private readonly model: ChatGoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>(
      'langchain.gemini.apiKey',
    );
    const modelName = this.configService.getOrThrow<string>(
      'langchain.gemini.model',
    );

    this.model = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: modelName,
    });
  }

  async extract(fileBuffer: Buffer, mimeType: string): Promise<string[]> {
    const message = {
      role: 'user' as const,
      content: [
        {
          type: 'text' as const,
          text: 'Analyze this document and extract the most important keywords and key phrases. Focus on main topics, concepts, and important terms. Extract 5-10 relevant keywords or short phrases.',
        },
        {
          type: 'media' as const,
          data: fileBuffer.toString('base64'),
          mimeType: mimeType,
        },
      ],
    };

    const keywords = z.object({
      keywords: z
        .array(z.string())
        .describe(
          'List of 5-10 relevant keywords or short phrases from the document',
        ),
    });

    const response = await this.model
      .withStructuredOutput(keywords, { name: 'keywords' })
      .invoke([message]);

    return response.keywords;
  }
}
