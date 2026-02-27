import { IsString } from "class-validator";


export class CreateEmailTemplateDto{

    @IsString()
    templateId : string;
}