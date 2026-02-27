import { Controller, Post } from '@nestjs/common';

@Controller('emails')
export class EmailsController {

    @Post('send')
    async sendTemplateEmail(){
        
    }
}
