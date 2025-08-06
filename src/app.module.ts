import { Module } from '@nestjs/common';
import { AppConfigModule } from './modules/config/config.module';
import { AppPrismaModule } from './modules/prisma/prisma.module';
import { AppGraphqlModule } from './modules/graphql/graphql.module';
import { AppLangchainModule } from './modules/langchain/langchain.module';
import { AppEventsModule } from './modules/events/events.module';
import { DocumentsModule } from './documents/documents.module';
import { AppS3Module } from './modules/s3/s3.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [
    AppConfigModule,
    AppPrismaModule,
    AppGraphqlModule,
    AppLangchainModule,
    AppEventsModule,
    AppS3Module,
    DocumentsModule,
    AnalysisModule,
  ],
})
export class AppModule {}
