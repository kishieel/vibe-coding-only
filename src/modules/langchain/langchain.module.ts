import { Global, Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { LanguageAgent } from './agents/language.agent';
import { KeywordsAgent } from './agents/keywords.agent';

@Global()
@Module({
  providers: [LangchainService, LanguageAgent, KeywordsAgent],
  exports: [LangchainService],
})
export class AppLangchainModule {}
