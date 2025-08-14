import { Module } from '@nestjs/common';
import { CatsService } from './test-module.service';
import { TestModuleController } from './test-module.controller';

@Module({
  controllers: [TestModuleController],
  providers: [CatsService],
})
export class TestModuleModule {}
