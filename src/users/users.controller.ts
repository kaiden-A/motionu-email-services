import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly userService : UsersService){}

    @UseGuards(AuthGuard)
    @Post('/generate-token')
    async generateApiKey(
        @Body() name : string,
        @Req() request : Request
    ){
        const user = request['user'];

        return this.userService.generateApiKey({
            userId : user.id,
            name
        })
    }

}
