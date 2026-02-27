import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmailsModule } from './emails/emails.module';
import { UsersModule } from './users/users.module';
import { BrevoModule } from './brevo/brevo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, 
    EmailsModule, 
    UsersModule, 
    BrevoModule , 
    ConfigModule.forRoot({isGlobal : true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
