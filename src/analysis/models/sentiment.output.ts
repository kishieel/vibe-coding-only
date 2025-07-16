import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SentimentOutput {
  @Field()
  sentiment: string;
}
