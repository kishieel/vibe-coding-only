import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class LanguageAgent {
  private readonly model: ChatGoogleGenerativeAI;
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow<string>(
      'langchain.gemini.apiKey',
    );
    const modelName = this.configService.getOrThrow<string>(
      'langchain.gemini.model',
    );

    this.model = new ChatGoogleGenerativeAI({
      apiKey: this.apiKey,
      model: modelName,
    });
  }

  async extract(fileBuffer: Buffer, mimeType: string): Promise<string> {
    if (mimeType.startsWith('image/')) {
      return this.extractFromImage(fileBuffer, mimeType);
    } else if (mimeType === 'application/pdf') {
      return this.extractFromPdf(fileBuffer, mimeType);
    } else if (mimeType.startsWith('text/')) {
      return this.extractFromText(fileBuffer);
    } else {
      return this.extractFromOther(fileBuffer);
    }
  }

  private async extractFromImage(
    fileBuffer: Buffer,
    mimeType: string,
  ): Promise<string> {
    const base64Image = fileBuffer.toString('base64');
    const prompt = `Analyze this image and determine the primary language used in any text visible in the image. 
      If there is text in the image, return the two-letter ISO 639-1 language code (e.g., 'en' for English, 'pl' for Polish, 'fr' for French).
      If there is no text visible in the image, return 'en' as the default.
      Only return the two-letter language code, nothing else.`;

    const imageMessage = {
      role: 'user' as const,
      content: [
        { type: 'text' as const, text: prompt },
        {
          type: 'image_url' as const,
          image_url: {
            url: `data:${mimeType};base64,${base64Image}`,
          },
        },
      ],
    };

    const response = await this.model.invoke([imageMessage]);
    const content =
      typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content);

    return content.trim().toLowerCase();
  }

  private async extractFromPdf(
    fileBuffer: Buffer,
    mimeType: string,
  ): Promise<string> {
    const message = {
      role: 'user' as const,
      content: [
        {
          type: 'text' as const,
          text: "Analyze this PDF document and determine the primary language used in the text content. Return only the two-letter ISO 639-1 language code (e.g., 'en' for English, 'pl' for Polish, 'fr' for French). Only return the two-letter language code, nothing else.",
        },
        {
          type: 'media' as const,
          data: fileBuffer.toString('base64'),
          mimeType: mimeType,
        },
      ],
    };

    const response = await this.model.invoke([message]);

    const content =
      typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content);

    return content.trim().toLowerCase();
  }

  private async extractFromText(fileBuffer: Buffer): Promise<string> {
    const textContent = fileBuffer.toString('utf-8').substring(0, 2000);
    const prompt = `Analyze this document content and determine the primary language used. 
      Return only the two-letter ISO 639-1 language code (e.g., 'en' for English, 'pl' for Polish, 'fr' for French).
      Only return the two-letter language code, nothing else.
      
      Document content:
      ${textContent}`;

    const response = await this.model.invoke(prompt);
    const content =
      typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content);

    return content.trim().toLowerCase();
  }

  private async extractFromOther(fileBuffer: Buffer): Promise<string> {
    const textContent = fileBuffer.toString('utf-8').substring(0, 2000);
    const prompt = `Analyze this document content and determine the primary language used. 
      Return only the two-letter ISO 639-1 language code (e.g., 'en' for English, 'pl' for Polish, 'fr' for French).
      Only return the two-letter language code, nothing else.
      
      Document content:
      ${textContent}`;

    const response = await this.model.invoke(prompt);
    const content =
      typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content);

    return content.trim().toLowerCase();
  }
}
