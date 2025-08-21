import { Injectable, NotFoundException } from '@nestjs/common';
//typeform imports
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';

export interface CreateItemDto {
  name: string;
  description?: string;
  quantity?: number;
}

export interface UpdateItemDto {
  name?: string;
  description?: string;
  quantity?: number;
}

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
  ) {}

  async create(dto: CreateItemDto): Promise<Item> {
    const item = this.repo.create({
      name: dto.name,
      description: dto.description ?? undefined,
      quantity: dto.quantity ?? 0,
    });
    return this.repo.save(item);
  }

  findAll(): Promise<Item[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Item ${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (!result.affected) throw new NotFoundException(`Item ${id} not found`);
  }
}
