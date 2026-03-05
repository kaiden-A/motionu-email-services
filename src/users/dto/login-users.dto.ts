import { IsString } from "class-validator";


export class LoginUsersDto {

    @IsString()
    email : string;

    @IsString()
    password : string;
}