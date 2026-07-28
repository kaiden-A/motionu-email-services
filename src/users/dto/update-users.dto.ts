import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateUsersDto{

    @ApiProperty()
    @IsString()
    name! : string;

    @ApiProperty()
    @IsString()
    password! : string;
}
