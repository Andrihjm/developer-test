import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CrudRequestDto } from 'src/domain/dto/request/crud.request.dto';
import { CrudService } from 'src/internal/services/crud/crud.service';

@Controller('crud')
export class CrudController {
  constructor(private crudService: CrudService) {}

  @Post()
  post(@Body() req: CrudRequestDto) {
    return this.crudService.POST(req);
  }

  @Get()
  get() {
    return this.crudService.GET();
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() req: CrudRequestDto) {
    return this.crudService.PUT(id, req);
  }

  @Delete()
  delete(@Body() req: CrudRequestDto) {
    const { id } = req;
    return this.crudService.DELETE(id);
  }
}
