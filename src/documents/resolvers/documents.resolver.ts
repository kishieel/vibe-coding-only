import {
  Resolver,
  Args,
  Mutation,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DocumentsService } from '../documents.service';
import { DocumentCreateInput } from '../models/document-create.input';
import { DocumentObject } from '../models/document.object';
import { DocumentInput } from '../models/document.input';
import { S3Service } from '../../modules/s3/s3.service';

@Resolver(() => DocumentObject)
export class DocumentsResolver {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly s3Service: S3Service,
  ) {}

  @Mutation(() => DocumentObject)
  async createDocument(
    @Args('input') input: DocumentCreateInput,
  ): Promise<DocumentObject> {
    const doc = await this.documentsService.createDocument(input.file);
    return { ...doc };
  }

  @Query(() => DocumentObject, { nullable: true })
  async document(
    @Args('input') input: DocumentInput,
  ): Promise<DocumentObject | null> {
    const doc = await this.documentsService.getDocument(input.id);
    return doc ? { ...doc } : null;
  }

  @ResolveField(() => String)
  async signedUrl(@Parent() document: DocumentObject): Promise<string> {
    return this.s3Service.getSignedUrl(document.s3Key);
  }
}
