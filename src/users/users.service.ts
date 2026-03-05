import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
            }
        })
    }


    async generateToken(){

    }


}
