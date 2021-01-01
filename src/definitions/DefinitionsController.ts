import {Controller, Get, Param, ParseBoolPipe, Query} from "@nestjs/common";
import { DefinitionService } from "./DefinitionService";
import {DefinitionRecord} from "./model/DefinitionRecord";
import {StringUtils} from "turbocommons-ts";

@Controller("def")
export class DefinitionsController{
    constructor(private readonly definitionService: DefinitionService) {}

    @Get('find')
    findOne(@Query('id') id: string, @Query('similar', ParseBoolPipe) similar: boolean): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar);
        return JSON.stringify(definitionRecords);
    }
    @Get('getLaws')
    getLaws(@Query('id') id: string, @Query('similar', ParseBoolPipe) similar: boolean): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar);
        const laws = definitionRecords.map(def => def.Law);
        const uniqueLaws = [];
        laws.forEach(law => {
            if(!uniqueLaws.includes(law)){
                uniqueLaws.push(law)
            }});
        uniqueLaws.sort(((a, b) => {
            return this.definitionService.sort(a,b,'_');
        }))
        let result = ""
        uniqueLaws.map(def => {result = result.concat(`<p dir=\"rtl\">${def}</p>`)});
        return result;
        //return JSON.stringify(uniqueLaws);
    }

    @Get('getDesc')
    getDescriptions(@Query('id') id: string, @Query('similar', ParseBoolPipe) similar: boolean): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar);
        const descriptions = definitionRecords.map(def => def.Description);
        const uniqueDescriptions = [];
        descriptions.forEach(desc => {
            if(!uniqueDescriptions.includes(desc)){
                uniqueDescriptions.push(desc)
            }});
        uniqueDescriptions.sort(((a, b) => {
            return this.definitionService.sort(a,b);
        }))

        let result = ""
        uniqueDescriptions.map(def => {result = result.concat(`<p dir=\"rtl\">${def}</p>`)});
        return result;
        //return JSON.stringify(uniqueDescriptions);
    }

    @Get('getDefs')
    getSimilarDefs(@Query('id') id: string, @Query('similar', ParseBoolPipe) similar: boolean): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar);
        const definitions = definitionRecords.map(def => def.Definition);
        const similarDefinitions = [];
        definitions.forEach(def => {
            if(!similarDefinitions.includes(def)){
                similarDefinitions.push(def)
            }});
        similarDefinitions.sort(((a, b) => {
            return this.definitionService.sort(a,b);
        }))
        let result = ""
        similarDefinitions.map(def => {result = result.concat(`<p dir=\"rtl\">${def}</p>`)});
        return result;
        //return JSON.stringify(similarDefinitions);
    }
}