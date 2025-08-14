import { Module } from '@nestjs/common';
import { TestModuleController } from './test-module.controller';
import { CatsService } from './test-module.service';

@Module({
  controllers: [TestModuleController],
  providers: [CatsService],
})
export class TestModuleModule {}
