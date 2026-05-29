import { IsEmail, IsString } from "class-validator";

export class VerifyEmailDto {
    
    @IsEmail()
    email! : string;

    @IsString()
    name! : string;

    @IsString()
    password! : string;
}
