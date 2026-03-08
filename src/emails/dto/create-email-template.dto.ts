import { IsString } from "class-validator";
import { UserPayloadDto } from "./user-payload.dto";


export class CreateEmailTemplateDto{

    @IsString()
    templateId : string;

    @IsString()
    toEmail : string;

    @IsString()
    subject : string;

    user : UserPayloadDto;

    data : Record<string,any>


}