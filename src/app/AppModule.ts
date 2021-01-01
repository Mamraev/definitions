import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import {DefinitionsModule} from "../definitions/DefinitionsModule";

@Module({
  imports: [DefinitionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
