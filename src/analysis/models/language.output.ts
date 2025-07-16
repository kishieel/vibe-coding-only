import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LanguageOutput {
  @Field()
  language: string;
}
