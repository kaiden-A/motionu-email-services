import { Injectable } from '@nestjs/common';
import { user } from 'node_modules/@getbrevo/brevo/dist/cjs/api';
import { BrevoService } from 'src/brevo/brevo.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPayloadDto } from './dto/user-payload.dto';

@Injectable()
export class EmailsService {

    constructor( 
        private readonly brevoService : BrevoService,
        private readonly prisma : PrismaService
    
    ){}

    async sendEmailTemplate(params : {
        id : string,
        from : string,
        to : string,
        subject : string,
        user : UserPayloadDto
        data : {}
    }){
        const {id , from , to , subject , user , data} = params;

        const template = await this.prisma.emailTemplate.findFirst({
            where : {id}
        })

        if(!template){
            throw new Error('Template Doesnt Exist');
        }

        const requiredFields = template?.requiredFields as string[];

        for(const field of requiredFields){
            if(!(field in data)){
                throw new Error(`Missing Required Fields: ${field}`)
            }
        }

        const html = this.renderTemplate(template.html , data);

        const result = await this.brevoService.sendEmail({
            to,
            subject,
            htmlContent : html
        })

        await this.prisma.emailLogs.create({
            data : {
                userId : user.id,
                fromEmail : user.email,
                toEmail: to,
                subject : subject,
                messageId : result?.messageId as string,

            }

        })

        return{
            success : true,
            message : 'Successfully Send Emails'
        }
    }


    async sendEmailHtml(){

    }

    private  renderTemplate(html: string, data: Record<string, string>) {
        let rendered = html

        for (const key in data) {
            rendered = rendered.replaceAll(`{{${key}}}`, data[key])
        }

        return rendered
    }
}
