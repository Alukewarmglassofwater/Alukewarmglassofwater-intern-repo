// src/.../dto/create-crudmodule.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCrudmoduleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number) // lets "2" be coerced to 2 when transform: true
  @IsInt()
  @Min(0)
  quantity?: number;
}
