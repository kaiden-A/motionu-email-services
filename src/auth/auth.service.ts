import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    async signUp(token: string) {
        try {

            // 1. Verify and decode the incoming verification JWT token 
            const payload = await this.jwtService.verifyAsync(token);
            const { email, name, password } = payload; 

            // 2. Hash the plain-text password securely
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 3. Call your update method to save the name, hashed password, and verify the user
            const updatedUser = await this.userService.update(email, {
                name: name,
                password: hashedPassword
            });

            // 4. Generate the final application login access token for their session
            const sessionPayload = { id: updatedUser.id, email: updatedUser.email , name : updatedUser.name};
            const accessToken = await this.jwtService.signAsync(sessionPayload);

            return {
                access_token: accessToken
            };

        } catch (error) {
            // Handles token expiration, invalid tokens, or Prisma update failures
            throw new UnauthorizedException('Invalid or expired verification token');
        }
    }

    async login(params : LoginUsersDto){


        const userExist = await this.userService.findOneByEmail(params.email);

        if(!userExist){
            throw new UnauthorizedException('Invalid Credentials');
        }

        const isValid = await bcrypt.compare(params.password , userExist.password_hash!);

        if(!isValid){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload = {id : userExist.id , email : userExist.email , name : userExist.name}
        const token = await this.jwtService.signAsync(payload)

        return {
            access_token : token 
        }

    }

    async verifyEmail(params : {email : string , name : string , password : string}){

        const user = await this.userService.findOneByEmail(params.email);
        

        if(!user){
            throw new NotFoundException('Email not found');
        }

        const payload = {email : user.email , name : params.name , password : params.password};
        const token = await this.jwtService.signAsync(payload);

        return {
            email : user.email,
            token : token
        }

    }

    async verifyToken(params : {token : string}){

        try {
            await this.jwtService.verifyAsync(params.token);
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        return {
            success : true
        }

    }

    async verifyApiKey(params : {apiKey : string}){

        const keyRecord = await this.prisma.apiKeys.findUnique({
            where : {
                apiKey : params.apiKey
            }
        })

        if(!keyRecord || keyRecord.revoked){
            throw new UnauthorizedException('API key is not valid')
        }

        return {
            valid : true
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
