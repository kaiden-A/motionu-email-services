import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyApiKeyDto {
  @ApiProperty({ description: 'API key to verify' })
  @IsString()
  apiKey!: string;
}
