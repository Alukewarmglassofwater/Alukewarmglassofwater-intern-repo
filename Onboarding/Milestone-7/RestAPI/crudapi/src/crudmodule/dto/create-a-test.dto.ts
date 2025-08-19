// src/crudmodule/dto/create-a-test.dto.ts
import { IsNumber } from 'class-validator';

export class TestDto {
  @IsNumber()
  value: number;
}
