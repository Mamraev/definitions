import {Injectable} from "@nestjs/common";
import {DefinitionRecord} from "./model/DefinitionRecord";
import * as definitionsJson from '../../data/definitions/Definitions.json';
import {StringUtils} from "turbocommons-ts";

@Injectable()
export class DefinitionService{
    getDefinitions(): DefinitionRecord[]{
        return definitionsJson as DefinitionRecord[];
    }

    getDefinitionsById(def: string, similar: boolean): DefinitionRecord[]{
        if(similar){
            return this.getDefinitions().filter(d => (this.checkSimilarity(d.Definition, def)> 80));

        }else{
            return this.getDefinitions().filter(d => d.Definition === def);
        }
    }

    checkSimilarity(strA,strB): number{
        const res = StringUtils.compareSimilarityPercent(strA,strB);
        return res;
    }

    sort(str1: string, str2: string, separator = ' '): number{
        const diff = StringUtils.countWords(str1, separator) - StringUtils.countWords(str2, separator);
        if(diff == 0){
            return str1.localeCompare(str2);
        }else{
            return diff;
        }
    }

}