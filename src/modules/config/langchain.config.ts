import { registerAs } from '@nestjs/config';

export default registerAs('langchain', () => ({
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    embeddingsModel: process.env.GEMINI_EMBEDDINGS_MODEL || 'gemini-embeddings',
  },
  llm: {
    apiKey: process.env.LANGCHAIN_LLM_API_KEY,
    model: process.env.LANGCHAIN_LLM_MODEL || 'gpt-3.5-turbo',
    embeddingsModel:
      process.env.LANGCHAIN_EMBEDDINGS_MODEL || 'text-embedding-3-small',
  },
}));
