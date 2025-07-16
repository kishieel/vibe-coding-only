import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver } from '@graphql-yoga/nestjs';
import { GraphQLFile } from 'src/commons/scalars/file.scalar';
import { join } from 'node:path';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: YogaDriver,
      debug: true,
      introspection: true,
      playground: true,
      sortSchema: true,
      autoSchemaFile: {
        path: join(process.cwd(), 'graphql', 'schema.graphql'),
      },
    }),
  ],
  providers: [GraphQLFile],
})
export class AppGraphqlModule {}
