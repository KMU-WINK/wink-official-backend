import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.getOrThrow<string>('jwt.secret'),
      signOptions: {
        expiresIn: this.configService.getOrThrow<string>('jwt.expiresIn'),
      },
    };
  }
}