import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class LoginUsersDto {

    @ApiProperty({ example: 'user@example.com' })
    @IsString()
    email! : string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    password! : string;
}
