import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(
        private jwtService : JwtService,
        private userService : UsersService,
        private prisma : PrismaService
    ){}

    async signUp(params : CreateUserDto){

        const {name , email , password} = params;

        const user = await this.userService.findOneByEmail(email);

        if(user){
            throw new ConflictException('Email Already Exist');
        }

        const hashPassword = await bcrypt.hash(password , 10);
        const crtUser = await this.userService.register({
            name : name,
            email : email,
            password : hashPassword
        })

        if(!crtUser){
            throw new Error('Fail Creating Users')
        }

        const payload = {
            id : crtUser.id,
            email : crtUser.email
        }

        const token = await this.jwtService.signAsync(payload);

        return {
            access_token : token
        }

    }

    async login(params : LoginUsersDto){


        const userExist = await this.userService.findOneByEmail(params.email);

        if(!userExist){
            throw new UnauthorizedException('Invalid Credentials');
        }

        const isValid = await bcrypt.compare(params.password , userExist.password_hash);

        if(!isValid){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload = {id : userExist.id , email : userExist.email}
        const token = await this.jwtService.signAsync(payload)

        return {
            access_token : token 
        }

    }

    async generateApiKey(params : {
        userId : string,
        name : string
    }){

        const {userId , name} = params

        const apiKey = crypto.randomBytes(32).toString('hex');
        const strApiKey = await this.prisma.apiKeys.create({
            data : {
                userId : userId,
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
