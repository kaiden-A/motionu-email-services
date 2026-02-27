import { Injectable , InternalServerErrorException } from '@nestjs/common';
import { 
  BrevoError,
  BrevoClient
} from '@getbrevo/brevo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BrevoService {

    private brevo : BrevoClient;

    constructor(private config : ConfigService){
        this.brevo = new BrevoClient({
            apiKey : () => this.config.getOrThrow<string>('BREVO_API_KEY')
        })
    }

    async sendEmail(
        {to , subject , htmlContent} : 
        {to : string , subject : string , htmlContent : string}
    ){

        try{

            return await this.brevo.transactionalEmails.sendTransacEmail({
                subject,
                htmlContent,
                sender : {
                    name : 'Motion-U : Innovation in Action',
                    email : 'info@motionukict.com'
                },
                to : [{email : to}]
            })

        }catch(err){
  
            if (err instanceof BrevoError) {
                console.error(`API Error ${err.statusCode}:`, err.message);
            }

            throw new InternalServerErrorException(err.message)
        }
    }
}
