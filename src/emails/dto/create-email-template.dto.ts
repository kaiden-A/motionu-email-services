import { IsString } from "class-validator";
import { UserPayloadDto } from "./user-payload.dto";


export class CreateEmailTemplateDto{

    @IsString()
    templateId : string;

    @IsString()
    toEmail : string;

    @IsString()
    subject : string;

    @IsString()
    fromEmail : string;

    data : Record<string,any>


}