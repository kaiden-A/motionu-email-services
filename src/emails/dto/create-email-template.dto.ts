import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateEmailTemplateDto{

    @ApiProperty({ description: 'ID of the email template to use' })
    @IsString()
    templateId : string;

    @ApiProperty({ example: 'recipient@example.com' })
    @IsString()
    toEmail : string;

    @ApiProperty({ example: 'Your Subject Here' })
    @IsString()
    subject : string;

    @ApiProperty({ example: 'sender@example.com' })
    @IsString()
    fromEmail : string;

    @ApiProperty({ description: 'Key-value pairs to fill template placeholders', example: { name: 'John' } })
    data : Record<string,any>


}
