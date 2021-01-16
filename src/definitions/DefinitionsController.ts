import {Controller, DefaultValuePipe, Get, ParseBoolPipe, ParseIntPipe, Query} from "@nestjs/common";
import { DefinitionService } from "./DefinitionService";

@Controller("def")
export class DefinitionsController{
    constructor(private readonly definitionService: DefinitionService) {}

    @Get('find')
    findOne(@Query('id') id: string, @Query('similar', new DefaultValuePipe(false), ParseBoolPipe) similar : boolean, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar, similarityVar);
        return JSON.stringify(definitionRecords);
    }
    @Get('getLaws')
    getLaws(@Query('id') id: string, @Query('similar', new DefaultValuePipe(false), ParseBoolPipe) similar : boolean, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar, similarityVar);
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
    getDescriptions(@Query('id') id: string, @Query('similar', new DefaultValuePipe(false), ParseBoolPipe) similar : boolean, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar, similarityVar);
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
    getSimilarDefs(@Query('id') id: string, @Query('similar', new DefaultValuePipe(false), ParseBoolPipe) similar : boolean, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar, similarityVar);
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

    @Get('test')
    test(@Query('id') id: string, @Query('similar', new DefaultValuePipe(false), ParseBoolPipe) similar : boolean, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, similar, similarityVar);
        const descriptions = definitionRecords.map(def => def.Description);
        let uniqueDescriptions = [];
        descriptions.forEach(desc => {
            if(!uniqueDescriptions.includes(desc)){
                uniqueDescriptions=uniqueDescriptions.concat(desc.split(" "))
            }});

        const sorted = this.definitionService.sortByFrequencyAndRemoveDuplicates(uniqueDescriptions);
        let result = ""
        sorted.map(def => {result = result.concat(`<p dir=\"rtl\">${def}</p>`)});
        return result;
    }
}