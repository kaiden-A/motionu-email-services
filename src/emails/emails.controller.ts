import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { SendEmailHtmlDto } from './dto/send-email-html.dto';
import { EmailsService } from './emails.service';
import { EmailsGuard } from './emails.guard';

@ApiTags('Emails')
@Controller('emails')
export class EmailsController {

    constructor(private readonly emailService : EmailsService){}

    @UseGuards(EmailsGuard)
    @Post('send')
    @ApiSecurity('motionu-api-key')
    @ApiOperation({ summary: 'Send a transactional email using a template' })
    @ApiResponse({ status: 201, description: 'Email sent successfully' })
    async sendTemplateEmail(
        @Body() data : CreateEmailTemplateDto
    ){
        return this.emailService.sendEmailTemplate({
            templateId : data.templateId,
            to : data.toEmail,
            fromEmail : data.fromEmail,
            subject : data.subject,
            data : data.data
        })
    }

    @UseGuards(EmailsGuard)
    @Post('send-html')
    @ApiSecurity('motionu-api-key')
    @ApiOperation({ summary: 'Send a transactional email using raw HTML' })
    @ApiResponse({ status: 201, description: 'Email sent successfully' })
    async sendHtmlEmail(
        @Body() data : SendEmailHtmlDto
    ){
        return this.emailService.sendEmailHtml({
            to : data.toEmail,
            subject : data.subject,
            fromEmail : data.fromEmail,
            htmlContent : data.htmlContent
        })
    }
}
