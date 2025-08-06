import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { LangchainService } from '../../../src/modules/langchain/langchain.service';

describe('LangchainService (e2e)', () => {
  let service: LangchainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LangchainService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string): string | undefined => {
              const config: Record<string, string | undefined> = {
                'langchain.gemini.apiKey': process.env.GEMINI_API_KEY,
                'langchain.gemini.model':
                  process.env.GEMINI_MODEL || 'gemini-2.0-flash',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<LangchainService>(LangchainService);
  });

  describe('detectLanguage', () => {
    it('should detect English from text content', async () => {
      const textContent = Buffer.from(
        'This is a test document in English language.',
        'utf-8',
      );
      const mimeType = 'text/plain';

      const result = await service.detectLanguage(textContent, mimeType);

      expect(result).toBe('en');
    }, 30000); // 30 second timeout for API call

    it('should detect Polish from text content', async () => {
      const textContent = Buffer.from(
        'To jest przykładowy dokument w języku polskim. Zawiera polskie znaki diakrytyczne.',
        'utf-8',
      );
      const mimeType = 'text/plain';

      const result = await service.detectLanguage(textContent, mimeType);

      expect(result).toBe('pl');
    }, 30000);

    it('should handle empty content and return default language', async () => {
      const textContent = Buffer.from('', 'utf-8');
      const mimeType = 'text/plain';

      const result = await service.detectLanguage(textContent, mimeType);

      expect(result).toBe('en'); // Should fallback to English
    }, 30000);

    it('should handle image mime type', async () => {
      // Create a small dummy image buffer (1x1 pixel PNG)
      const pngBuffer = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, 0x00, 0x00, 0x00,
        0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0x1d, 0x01, 0x01, 0x00, 0x00, 0xff,
        0xff, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0x73, 0x75, 0x01, 0x18, 0x00,
        0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
      ]);
      const mimeType = 'image/png';

      const result = await service.detectLanguage(pngBuffer, mimeType);

      expect(result).toBe('en'); // Should return default 'en' for image with no text
    }, 30000);

    it('should handle API errors gracefully', async () => {
      // Mock the environment to cause an API error
      const originalApiKey = process.env.GEMINI_API_KEY;
      process.env.GEMINI_API_KEY = 'invalid_key';

      const textContent = Buffer.from('Test content', 'utf-8');
      const mimeType = 'text/plain';

      const result = await service.detectLanguage(textContent, mimeType);

      expect(result).toBe('en'); // Should fallback to English on error

      // Restore original API key
      process.env.GEMINI_API_KEY = originalApiKey;
    }, 30000);
  });

  describe('environment validation', () => {
    it('should throw error when GEMINI_API_KEY is not set', async () => {
      // Create a new service with mock config that returns undefined for API key
      const testModule = await Test.createTestingModule({
        providers: [
          LangchainService,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn((key: string) => {
                if (key === 'langchain.gemini.apiKey') return undefined;
                return 'gemini-2.0-flash'; // model
              }),
            },
          },
        ],
      }).compile();

      const testService = testModule.get<LangchainService>(LangchainService);
      const textContent = Buffer.from('Test content', 'utf-8');
      const mimeType = 'text/plain';

      await expect(
        testService.detectLanguage(textContent, mimeType),
      ).rejects.toThrow('GEMINI_API_KEY environment variable is not set');
    });
  });
});
