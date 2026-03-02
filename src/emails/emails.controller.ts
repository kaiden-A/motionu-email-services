import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { EmailsService } from './emails.service';
import { EmailsGuard } from './emails.guard';

@Controller('emails')
export class EmailsController {

    constructor(private readonly emailService : EmailsService){}

    @UseGuards(EmailsGuard)
    @Post('send')
    async sendTemplateEmail(
        @Body() data : CreateEmailTemplateDto
    ){
        return this.emailService.sendEmailTemplate({
            id : data.id,
            to : data.toEmail,
            subject : data.subject,
            user : data.user,
            data : data.data
        })
    }
}
