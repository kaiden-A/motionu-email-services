import { Controller, Post , Body , Req , UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { LoginUsersDto } from 'src/users/dto/login-users.dto';
import { AuthGuard } from './auth.guard';
import { GenerateApiKeyDto } from './dto/create-api-key.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { VerifyApiKeyDto } from './dto/verify-api-key.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @Post('/signup')
    @ApiOperation({ summary: 'Complete signup using verification token' })
    @ApiResponse({ status: 201, description: 'Returns JWT access token' })
    @ApiResponse({ status: 401, description: 'Invalid or expired verification token' })
    async signup(@Body() data : CreateUserDto){
        return this.authService.signUp(data.token);
    }

    @Post('/login')
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiResponse({ status: 200, description: 'Returns JWT access token' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() data : LoginUsersDto){
        return this.authService.login(data);
    }

    @Post('/verify-email')
    @ApiOperation({ summary: 'Generate email verification token' })
    @ApiResponse({ status: 201, description: 'Returns a verification JWT token' })
    @ApiResponse({ status: 404, description: 'Email not found' })
    async verifyEmail(@Body() data : VerifyEmailDto){
        return this.authService.verifyEmail(data);
    }

    @Post('/verify-token')
    @ApiOperation({ summary: 'Verify a JWT token is valid' })
    @ApiResponse({ status: 200, description: 'Token is valid' })
    @ApiResponse({ status: 401, description: 'Invalid token' })
    async verifyToken(@Body() data : VerifyTokenDto){
        return this.authService.verifyToken(data);
    }

    @Post('/verify-api-key')
    @ApiOperation({ summary: 'Verify an API key is valid (cross-check from other services)' })
    @ApiResponse({ status: 200, description: 'API key is valid' })
    @ApiResponse({ status: 401, description: 'Invalid or revoked API key' })
    async verifyApiKey(@Body() data : VerifyApiKeyDto){
        return this.authService.verifyApiKey({
            apiKey : data.apiKey
        })
    }

    @UseGuards(AuthGuard)
    @Post('/generate-apikeys')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Generate a new API key (requires JWT auth)' })
    @ApiResponse({ status: 201, description: 'API key generated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
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
