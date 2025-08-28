import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum Platform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
}

export class CreatePushTokenDto {
  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsEnum(Platform)
  platform: Platform;
}
