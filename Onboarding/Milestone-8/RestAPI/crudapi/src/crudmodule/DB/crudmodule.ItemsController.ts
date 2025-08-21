// src/crudmodule/items.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from '../dto/update-crudmodule.dto';
import { Item } from '../entities/item.entity';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly items: ItemsService) {}

  @Post()
  create(@Body() dto: CreateCrudmoduleDto) {
    return this.items.create(dto);
  }

  @Get()
  findAll() {
    return this.items.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const item = await this.items.findOne(id);
    console.log('is Item instance?', item instanceof Item); // should be true
    return this.items.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCrudmoduleDto,
  ) {
    return this.items.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.items.remove(id);
  }
}

@Controller('testEncrypt')
export class TestItemController {
  constructor(private readonly items: ItemsService) {}

  @Post('insert')
  async createTest(@Body() body: CreateCrudmoduleDto) {
    try {
      console.log('[testEncrypt] body =', body); // sanity
      return await this.items.createTestEncryptItem(body);
    } catch (e: any) {
      console.error('💥 Insert failed:', e?.message || e);
      if (e?.stack) console.error(e.stack);
      throw e;
    }
  }
}
