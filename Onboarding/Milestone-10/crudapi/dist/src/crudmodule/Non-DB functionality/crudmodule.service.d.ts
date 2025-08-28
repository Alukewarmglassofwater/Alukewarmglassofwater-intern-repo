import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from '../dto/update-crudmodule.dto';
import { TestDto } from '../dto/create-a-test.dto';
export declare class CrudmoduleService {
    create(createCrudmoduleDto: CreateCrudmoduleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCrudmoduleDto: UpdateCrudmoduleDto): string;
    remove(id: number): string;
}
export declare class ATestService {
    create(dto: TestDto): {
        message: string;
    };
}
export declare class returnInt {
    private items;
    getItemviaNum(id: number): {
        id: number;
        name: string;
    };
}
