import { IsString } from "class-validator";


export class UpdateUsersDto{

    @IsString()
    name! : string;

    @IsString()
    password! : string;
}