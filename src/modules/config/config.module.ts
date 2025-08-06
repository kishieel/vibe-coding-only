import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import langchainConfig from './langchain.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [langchainConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppConfigModule {}
