import { ItemsService } from './items.service';
import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from '../dto/update-crudmodule.dto';
import { Item } from '../entities/item.entity';
export declare class ItemsController {
    private readonly items;
    constructor(items: ItemsService);
    me(req: Request & {
        user?: any;
    }): any;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item>;
    update(id: number, dto: UpdateCrudmoduleDto): Promise<Item>;
    remove(id: number): Promise<void>;
}
export declare class TestItemController {
    private readonly items;
    constructor(items: ItemsService);
    create(dto: CreateCrudmoduleDto): Promise<Item>;
}
