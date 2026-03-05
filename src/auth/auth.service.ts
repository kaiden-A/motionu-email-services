import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';

@Injectable()
export class AuthService {

    constructor(
        private jwtService : JwtService,
        private userService : UsersService
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

}
