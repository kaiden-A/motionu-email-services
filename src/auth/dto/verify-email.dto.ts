import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyEmailDto {

    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email! : string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    name! : string;

    @ApiProperty({ example: 'securePassword123' })
    @IsString()
    password! : string;
}
