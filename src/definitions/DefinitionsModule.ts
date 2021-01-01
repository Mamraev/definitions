import { Module } from '@nestjs/common';
import { DefinitionsController } from './DefinitionsController'
import { DefinitionService } from './DefinitionService'

@Module({
    imports: [],
    controllers: [DefinitionsController],
    providers: [DefinitionService],
})
export class DefinitionsModule {}
