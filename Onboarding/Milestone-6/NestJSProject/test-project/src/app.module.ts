import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModuleModule } from './test-module/test-module.module'; //module added

@Module({
  imports: [TestModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
