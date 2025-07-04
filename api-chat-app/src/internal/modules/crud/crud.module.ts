import { Module } from '@nestjs/common';
import { CrudController } from 'src/internal/controllers/crud/crud.controller';
import { CrudService } from 'src/internal/services/crud/crud.service';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  providers: [PrismaService, CrudService],
  controllers: [CrudController],
})
export class CrudModule {}
