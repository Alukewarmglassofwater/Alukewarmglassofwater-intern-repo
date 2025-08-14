import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './test-module.service';

@Controller('test-module')
export class TestModuleController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.findAll();
  }

  @Post()
  add(@Body('name') name: string) {
    return this.catsService.create(name);
  }
}
