import { IsString } from "class-validator";


export class GenerateApiKeyDto {
    
    @IsString()
    name : string;
}