import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from '../dto/update-crudmodule.dto';
import { ATestService } from './crudmodule.service';
import { TestDto } from '../dto/create-a-test.dto';
import { CrudmoduleService } from './crudmodule.service';
import { returnInt } from './crudmodule.service';
export declare class CrudmoduleController {
    private readonly crudmoduleService;
    constructor(crudmoduleService: CrudmoduleService);
    create(createCrudmoduleDto: CreateCrudmoduleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCrudmoduleDto: UpdateCrudmoduleDto): string;
    remove(id: string): string;
}
export declare class RetNumber {
    private readonly aTestService;
    constructor(aTestService: ATestService);
    test(dto: TestDto): {
        message: string;
    };
}
export declare class RetItemViaNum {
    private readonly returnInt;
    constructor(returnInt: returnInt);
    findOne(id: number): {
        id: number;
        name: string;
    };
}
