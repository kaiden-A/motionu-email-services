import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto{

    @ApiProperty({ description: 'Verification JWT token from verify-email step' })
    @IsString()
    token! : string;
}
