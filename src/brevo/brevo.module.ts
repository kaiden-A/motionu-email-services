import { Module } from '@nestjs/common';
import { BrevoService } from './brevo.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [BrevoService],
  exports: [BrevoService]
})
export class BrevoModule {}
