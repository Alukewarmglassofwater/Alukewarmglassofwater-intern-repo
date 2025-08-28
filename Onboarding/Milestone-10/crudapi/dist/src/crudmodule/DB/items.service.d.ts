import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';
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
export declare class ItemsService {
    private readonly repo;
    constructor(repo: Repository<Item>);
    create(dto: CreateItemDto): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item>;
    update(id: number, dto: UpdateItemDto): Promise<Item>;
    remove(id: number): Promise<void>;
    createTestEncryptItem(body: CreateCrudmoduleDto): Promise<Item>;
}
