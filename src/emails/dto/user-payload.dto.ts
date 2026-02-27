import { IsString } from "class-validator";


export class UserPayloadDto{

    @IsString()
    id : string;

    @IsString()
    email : string

}