import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class KeywordsOutput {
  @Field(() => [String])
  keywords: string[];
}
