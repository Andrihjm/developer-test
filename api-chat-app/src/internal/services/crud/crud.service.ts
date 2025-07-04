import { ConflictException, Injectable } from '@nestjs/common';
import { CrudRequestDto } from 'src/domain/dto/request/crud.request.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class CrudService {
  constructor(private readonly prisma: PrismaService) {}

  async POST(req: CrudRequestDto) {
    const result = await this.prisma.crud.create({
      data: {
        content: req.content,
      },
    });

    return {
      status: 200,
      message: 'Data created successfully',
      data: result,
    };
  }

  async PUT(id: string, req: CrudRequestDto) {
    const alreadyID = await this.prisma.crud.findFirst({
      where: {
        id,
      },
    });

    if (!alreadyID) {
      throw new ConflictException('Data not found');
    }

    const result = await this.prisma.crud.update({
      where: {
        id,
      },
      data: {
        content: req.content,
      },
    });

    return {
      status: 200,
      message: 'Data updated successfully',
      data: result,
    };
  }

  async GET() {
    const result = await this.prisma.crud.findMany();

    return {
      status: 200,
      message: 'Data fetched successfully',
      data: result,
    };
  }

  async DELETE(id: string) {
    const result = await this.prisma.crud.delete({
      where: {
        id,
      },
    });

    return {
      status: 200,
      message: 'Data deleted successfully',
      data: result,
    };
  }
}
