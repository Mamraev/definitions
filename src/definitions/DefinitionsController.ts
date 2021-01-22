import {Controller, DefaultValuePipe, Get, ParseBoolPipe, ParseIntPipe, Query} from "@nestjs/common";
import { DefinitionService } from "./DefinitionService";

@Controller("def")
export class DefinitionsController{
    constructor(private readonly definitionService: DefinitionService) {}
    @Get('getLaws')
    getLaws(@Query('id') id: string, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number, @Query('details', new DefaultValuePipe(false), ParseBoolPipe) details : boolean): string {
        const allIds = this.definitionService.splitIntoMultipleIds(id);
        let definitionRecords = [];
        allIds.forEach(id => definitionRecords = definitionRecords.concat(this.definitionService.getDefinitionsById(id, false, 100)));
        const laws = definitionRecords.map(def => def.Law);
        let uniqueLaws = [];
        laws.forEach(law => {
            if(!uniqueLaws.includes(law)){
                uniqueLaws.push(law)
            }});
        uniqueLaws.sort(((a, b) => {
            return this.definitionService.sort(a,b,'_');
        }))
        let result = ""
        if(details){
            uniqueLaws.map(law => {
                const url = this.definitionService.getLawUrl(law);
                const lawRecords = this.definitionService.getDefinitionsByLaw(law);
                if(url === ""){
                    result = result.concat(`<h2 dir=\"rtl\">${law.split("_").join(" ")}</h2>`);
                }else{
                    result = result.concat(`<h2 dir=\"rtl\"><a href=\"${url}\" target="_blank" >${law.split("_").join(" ")}</a></h2>`);
                }
                lawRecords.forEach(lawRecord => {
                    if(allIds.includes(lawRecord.Definition)){
                        result = result.concat(`<p dir=\"rtl\"><u><b>הגדרה:</b></u> ${lawRecord.Definition} <u><b>מחלקה:</b></u> ${lawRecord.Section} <u><b>נוסח:</b></u> ${lawRecord.Description} </p>`);
                    }
                })
            });
        }else{
            uniqueLaws.map(law => {
                const url = this.definitionService.getLawUrl(law);
                if(url === ""){
                    result = result.concat(`<p dir=\"rtl\">${law.split("_").join(" ")}</p>`);
                }else{
                    result = result.concat(`<p dir=\"rtl\"><a href=\"${url}\" target="_blank" >${law.split("_").join(" ")}</a></p>`);
                }
            });
        }
        return result;
    }

    @Get('getDesc')
    getDescriptions(@Query('id') id: string, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number,@Query('details', new DefaultValuePipe(false), ParseBoolPipe) details : boolean): string {
        const allIds = this.definitionService.splitIntoMultipleIds(id);
        let definitionRecords = [];
        allIds.forEach(id => definitionRecords = definitionRecords.concat(this.definitionService.getDefinitionsById(id, false, 100)));
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
        if(details){
            uniqueDescriptions.map(desc => {
                const defRecord = this.definitionService.getDefinitionsByDescription(desc);

                result = result.concat(`<h2 dir=\"rtl\">${desc}</h2>`)
                defRecord.forEach(descRecord => {
                    if(allIds.includes(descRecord.Definition)){
                        result = result.concat(`<p dir=\"rtl\"><u><b>הגדרה:</b></u> ${descRecord.Definition} <u><b>מחלקה:</b></u> ${descRecord.Section}</p>`);
                        const url = this.definitionService.getLawUrl(descRecord.Law);
                        if(url === ""){
                            result = result.concat(`<p dir=\"rtl\"><u><b>חוק:</b></u> ${descRecord.Law.split("_").join(" ")}</p>`);
                        }else{
                            result = result.concat(`<p dir=\"rtl\"><u><b>חוק:</b></u> <a href=\"${url}\" target="_blank" >${descRecord.Law.split("_").join(" ")}</a></p>`);
                        }
                    }
                })
            });

        }else{
            uniqueDescriptions.map(desc => {result = result.concat(`<p dir=\"rtl\">${desc}</p>`)});
        }
        return result;
    }

    @Get('getDefs')
    getSimilarDefs(@Query('id') id: string, @Query('similarityVar', new DefaultValuePipe(80), ParseIntPipe) similarityVar: number): string {
        const definitionRecords = this.definitionService.getDefinitionsById(id, true, similarityVar);
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
    }
}