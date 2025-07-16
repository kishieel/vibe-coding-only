import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DocumentObject {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  fileName: string;

  @Field(() => Int)
  fileSize: number;

  @Field(() => String)
  mimeType: string;

  @Field(() => String)
  s3Key: string;

  @Field(() => String, { nullable: true })
  summary?: string | null;

  @Field(() => [String], { nullable: true })
  keywords?: string[];

  @Field(() => [String], { nullable: true })
  topics?: string[];

  @Field(() => String, { nullable: true })
  sentiment?: string | null;

  @Field(() => String, { nullable: true })
  language?: string | null;

  @Field(() => String, { nullable: true })
  classification?: string | null;

  @Field(() => String, { nullable: true })
  confidence?: number | null;
}
