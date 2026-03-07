import { Controller, Post , Body , Req , UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';
import { AuthGuard } from './auth.guard';
import { GenerateApiKeyDto } from './dto/create-api-key.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @Post('/signup')
    async signup(@Body() data : CreateUserDto){
        return this.authService.signUp(data);
    }

    @Post('/login')
    async login(@Body() data : LoginUsersDto){
        return this.authService.login(data);
    }

    @UseGuards(AuthGuard)
    @Post('/generate-token')
    async generateApiKey(
        @Body() data : GenerateApiKeyDto,
        @Req() request : Request
    ){
        const user = request['user'];
        return this.authService.generateApiKey({
            userId : user.id,
            name : data.name 
        })
    }

}
