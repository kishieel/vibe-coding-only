import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../modules/prisma/prisma.service';
import { S3Service } from '../modules/s3/s3.service';
import { Document } from '@prisma/client';
import { File } from 'node:buffer';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
    private readonly eventEmitter: EventEmitter2,
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

    const document = await this.prisma.document.create({
      data: {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        s3Key,
      },
    });

    // Emit event for document processing
    this.eventEmitter.emit('document.uploaded', { documentId: document.id });

    return document;
  }

  async getDocument(id: number): Promise<Document | null> {
    return this.prisma.document.findUnique({ where: { id } });
  }
}
