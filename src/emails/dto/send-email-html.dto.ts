import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendEmailHtmlDto {

    @ApiProperty({ example: 'recipient@example.com' })
    @IsString()
    toEmail: string;

    @ApiProperty({ example: 'Your Subject Here' })
    @IsString()
    subject: string;

    @ApiProperty({ example: 'sender@example.com', required: false })
    @IsOptional()
    @IsString()
    fromEmail?: string;

    @ApiProperty({ description: 'Raw HTML content of the email' })
    @IsString()
    htmlContent: string;
}
