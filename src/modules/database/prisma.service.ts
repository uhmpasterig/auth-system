import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  handleError(e: PrismaClientKnownRequestError): never {
    switch (e.code) {
      case 'P2025':
        throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
      case 'P2002':
        throw new HttpException('Value already exists', HttpStatus.BAD_REQUEST);
      case 'P2021':
        throw new HttpException('Invalid field', HttpStatus.BAD_REQUEST);
      case 'P2016':
        throw new HttpException('Invalid value', HttpStatus.BAD_REQUEST);
      case 'P2003':
        throw new HttpException('Value not found', HttpStatus.NOT_FOUND);
      case 'P2001':
        throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
      case 'P2000':
        throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
      default:
        throw new HttpException(
          `Unknown Prisma error code: ${e.code}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async handleOperation<T>(operation: Promise<T>): Promise<T> {
    try {
      return await operation;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        this.handleError(e);
      } else {
        throw e;
      }
    }
  }
}
