import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TopicsOutput {
  @Field(() => [String])
  topics: string[];
}
