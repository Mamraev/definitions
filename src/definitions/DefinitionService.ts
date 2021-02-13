import {Injectable} from "@nestjs/common";
import {DefinitionRecord} from "./model/DefinitionRecord";
import * as definitionsJson from '../../data/definitions/Definitions.json';
import * as uriMap from '../../data/definitions/UriMap.json';
import {StringUtils} from "turbocommons-ts";
import {UriRecord} from "./model/UriRecord";

@Injectable()
export class DefinitionService{
    getDefinitions(): DefinitionRecord[]{
        return definitionsJson as DefinitionRecord[];
    }

    getDefinitionsById(def: string, similar: boolean, similarityVar: number): DefinitionRecord[]{
        if(similar){
            return this.getDefinitions().filter(d => (this.checkSimilarity(d.Definition, def)>= similarityVar));
        }else{
            return this.getDefinitions().filter(d => d.Definition === def);
        }
    }

    checkSimilarity(strA,strB): number{
        return StringUtils.compareSimilarityPercent(strA,strB);
    }

    sort(str1: string, str2: string, separator = ' '): number{
        const diff = StringUtils.countWords(str1, separator) - StringUtils.countWords(str2, separator);
        if(diff == 0){
            return str1.localeCompare(str2);
        }else{
            return diff;
        }
    }

    splitIntoMultipleIds(id: string){
        return id.split("\r\n");
    }

    getDefinitionsByLaw(law: string): DefinitionRecord[]{
        return this.getDefinitions().filter(def => def.Law === law);
    }
    getDefinitionsByDescription(desc: string): DefinitionRecord[]{
        return this.getDefinitions().filter(def => def.Description === desc);
    }

    getUris(){
        return uriMap as UriRecord[];
    }

    getLawUrl(law: string): string{
        const url = this.getUris().find(res => res.NormalizeName === law);
        if(!url){
            return "";
        }
        if(url.KnessetUrl === "needToCheck"){
            if(url.OpenLawBook){
                return url.OpenLawBook.OpenLawBookUrl ? url.OpenLawBook.OpenLawBookUrl : "";
            }
        }
        return url.KnessetUrl ? url.KnessetUrl : "";
    }
}