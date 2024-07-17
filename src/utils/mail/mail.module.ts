import { Module } from '@nestjs/common';
import { NodeMail } from './NodeMail';

@Module({
  providers: [NodeMail],
  exports: [NodeMail],
})
export class MailModule {}
