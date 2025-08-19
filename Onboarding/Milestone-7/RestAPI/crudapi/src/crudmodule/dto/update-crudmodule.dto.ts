import { PartialType } from '@nestjs/mapped-types';
import { CreateCrudmoduleDto } from './create-crudmodule.dto';

export class UpdateCrudmoduleDto extends PartialType(CreateCrudmoduleDto) {}
