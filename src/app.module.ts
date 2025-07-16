import { Module } from '@nestjs/common';
import { AppPrismaModule } from './modules/prisma/prisma.module';
import { AppGraphqlModule } from './modules/graphql/graphql.module';
import { AppLangchainModule } from './modules/langchain/langchain.module';
import { DocumentsModule } from './documents/documents.module';
import { AppS3Module } from './modules/s3/s3.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [
    AppPrismaModule,
    AppGraphqlModule,
    AppLangchainModule,
    AppS3Module,
    DocumentsModule,
    AnalysisModule,
  ],
})
export class AppModule {}
