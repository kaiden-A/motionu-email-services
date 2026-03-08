import { IsString } from "class-validator";


export class UserPayloadDto{

    @IsString()
    email : string

}