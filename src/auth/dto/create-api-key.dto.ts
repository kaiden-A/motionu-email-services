import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class GenerateApiKeyDto {

    @ApiProperty({ description: 'A name to identify this API key' })
    @IsString()
    name : string;
}
