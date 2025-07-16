import { InputType, Field } from '@nestjs/graphql';
import { GraphQLFile } from 'src/commons/scalars/file.scalar';
import { File } from 'node:buffer';

@InputType()
export class DocumentCreateInput {
  @Field(() => GraphQLFile)
  file: File;
}
