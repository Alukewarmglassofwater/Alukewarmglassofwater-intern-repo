import { Injectable } from '@nestjs/common';
import { CreateCrudmoduleDto } from './dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from './dto/update-crudmodule.dto';

import { TestDto } from './dto/create-a-test.dto';

@Injectable()
export class CrudmoduleService {
  create(createCrudmoduleDto: CreateCrudmoduleDto) {
    return 'This action adds a new crudmodule';
  }

  findAll() {
    return `This action returns all crudmodule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crudmodule`;
  }

  update(id: number, updateCrudmoduleDto: UpdateCrudmoduleDto) {
    return `This action updates a #${id} crudmodule`;
  }

  remove(id: number) {
    return `This action removes a #${id} crudmodule`;
  }
}

@Injectable()
export class ATestService {
  create(dto: TestDto) {  //use dto input 
      return { message: `You sent the number ${dto.value}\n` };
  }
}