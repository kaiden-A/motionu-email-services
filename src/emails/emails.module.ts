import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { BrevoModule } from 'src/brevo/brevo.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailsController } from './emails.controller';

@Module({
  imports: [BrevoModule , PrismaModule],
  providers: [EmailsService],
  controllers: [EmailsController]
})
export class EmailsModule {}
