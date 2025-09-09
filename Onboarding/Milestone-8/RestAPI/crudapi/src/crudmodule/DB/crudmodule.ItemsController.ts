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
  UseGuards,
  Req,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from '../dto/update-crudmodule.dto';
import { Item } from '../entities/item.entity';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { AdminOnlyGuard } from 'auth/admin-only.guard';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly items: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  create(@Body() dto: CreateCrudmoduleDto) {
    return this.items.create(dto);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  whoAmI(@Req() req) {
    return req.user;
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  async findAll() {
    try {
      console.log('[items.findAll] hit');
      return await this.items.findAll();
    } catch (e: any) {
      console.error('💥 items.findAll failed:', e?.message || e);
      if (e?.stack) console.error(e.stack);
      throw e;
    }
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
