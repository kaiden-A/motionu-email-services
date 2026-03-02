import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailsGuard implements CanActivate {

  constructor(private readonly prisma : PrismaService){}

  async canActivate(context: ExecutionContext,
  ): Promise<boolean>  {

    const request = context.switchToHttp().getRequest<Request>()
    const apiKeys = request.headers['x-api-key'] as string;

    if(!apiKeys){
      throw new UnauthorizedException('API keys is missings');
    }

    const keyRecord = await this.prisma.apiKeys.findUnique({
      where : {
        apiKey : apiKeys
      }
    })

    if(!keyRecord){
      throw new UnauthorizedException('API keys not valid')
    }


    return true;
  }
}
