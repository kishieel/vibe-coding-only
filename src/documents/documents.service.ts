import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { S3Service } from '../modules/s3/s3.service';
import { Document } from '@prisma/client';
import { File } from 'node:buffer';
import { Readable } from 'node:stream';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
  ) {}

  async createDocument(file: File): Promise<Document> {
    const allowedMimeTypes = [
      'application/pdf',
      'application/xml',
      'text/plain',
      'image/jpeg',
      'image/png',
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    const s3Key = `documents/${Date.now()}_${file.name}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await this.s3.uploadFile(s3Key, buffer, file.type, file.size);

    return this.prisma.document.create({
      data: {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        s3Key,
      },
    });
  }

  async getDocument(id: number): Promise<Document | null> {
    return this.prisma.document.findUnique({ where: { id } });
  }
}
