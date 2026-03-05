import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

    constructor(
        private readonly prisma : PrismaService
    ){}


    async findOneByEmail(email : string){

        const user = await this.prisma.users.findUnique({
            where : {
                email : email
            }
        });

        return user;

    }

    async register(params: CreateUserDto){

        return this.prisma.users.create({
            data : {
                email : params.email,
                password_hash : params.password,
                is_verified : true
            },
            select : {
                id : true,
                email : true
            }
        })
    }


    async generateApiKey(params : {
        userId : string,
        name : string
    }){

        const {userId , name} = params

        const apiKey = crypto.randomBytes(32).toString('hex');
        const strApiKey = await this.prisma.apiKeys.create({
            data : {
                id : userId,
                name : name,
                apiKey : apiKey
            }
        })

        if(!strApiKey){
            throw new Error('Fail Creating the API Key')
        }

        return {
            success : true, 
            apiKey : apiKey,
            message :  `Please Keep Your API key safe`
        }
    }


}
