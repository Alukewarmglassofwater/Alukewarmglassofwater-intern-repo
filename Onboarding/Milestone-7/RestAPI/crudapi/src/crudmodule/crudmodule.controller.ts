import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrudmoduleService } from './crudmodule.service';
import { CreateCrudmoduleDto } from './dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from './dto/update-crudmodule.dto';
//test dto import as well as the service
import { ATestService } from './crudmodule.service';
import { TestDto } from './dto/create-a-test.dto';

@Controller('crudmodule')
export class CrudmoduleController {
  constructor(private readonly crudmoduleService: CrudmoduleService) {}

  @Post()
  create(@Body() createCrudmoduleDto: CreateCrudmoduleDto) {
    return this.crudmoduleService.create(createCrudmoduleDto);
  }

  @Get()
  findAll() {
    return this.crudmoduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudmoduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudmoduleDto: UpdateCrudmoduleDto) {
    return this.crudmoduleService.update(+id, updateCrudmoduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudmoduleService.remove(+id);
  }
}


@Controller('newRoute') //route prefix
export class retNumber {  //new class name
  constructor(private readonly aTestService: ATestService) {} //constructor injection for the service

  @Post('retNumberRoute') //send back to user
  test(@Body() dto: TestDto) {
    return this.aTestService.create(dto); //pass the data you return through the DTO
  }
}