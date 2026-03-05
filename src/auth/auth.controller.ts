import { Controller, Post , Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';

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

}
