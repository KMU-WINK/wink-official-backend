import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CreateSocialEvent, DeleteSocialEvent, UpdateSocialEvent } from '../../../type';

@Injectable()
export class SocialAdminServiceEventListener {
  private readonly logger = new Logger(SocialAdminServiceEventListener.name);

  @OnEvent(CreateSocialEvent.EVENT_NAME)
  onCreateSocial({ member, social }: CreateSocialEvent) {
    this.logger.log(`Create social from ${member.name} (social: ${social.title} (${social._id}))`);
  }

  @OnEvent(UpdateSocialEvent.EVENT_NAME)
  onUpdateSocial({ member, social }: UpdateSocialEvent) {
    this.logger.log(`Update social from ${member.name} (social: ${social.title} (${social._id}))`);
  }

  @OnEvent(DeleteSocialEvent.EVENT_NAME)
  onDeleteSocial({ member, social }: DeleteSocialEvent) {
    this.logger.log(`Delete social from ${member.name} (social: ${social.title} (${social._id}))`);
  }
}
