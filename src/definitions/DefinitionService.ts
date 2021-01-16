import {Injectable} from "@nestjs/common";
import {DefinitionRecord} from "./model/DefinitionRecord";
import * as definitionsJson from '../../data/definitions/Definitions.json';
import {StringUtils} from "turbocommons-ts";

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

    sortByFrequencyAndRemoveDuplicates(array) {
        var frequency = {}, value;

        // compute frequencies of each value
        for(var i = 0; i < array.length; i++) {
            value = array[i];
            if(value in frequency) {
                frequency[value]++;
            }
            else {
                frequency[value] = 1;
            }
        }

        // make array from the frequency object to de-duplicate
        var uniques = [];
        for(value in frequency) {
            uniques.push(value);
        }

        // sort the uniques array in descending order by frequency
        function compareFrequency(a, b) {
            return frequency[b] - frequency[a];
        }

        return uniques.sort(compareFrequency);
    }
}