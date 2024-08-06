import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  DeleteMyAvatarEvent,
  UpdateMyAvatarEvent,
  UpdateMyInfoEvent,
  UpdateMyPasswordEvent,
} from '../../type';

@Injectable()
export class MemberServiceEventListener {
  private readonly logger = new Logger(MemberServiceEventListener.name);

  @OnEvent(UpdateMyInfoEvent.EVENT_NAME)
  onUpdateMyInfo({ member, description, github, instagram, blog }: UpdateMyInfoEvent) {
    this.logger.log(
      `Update my info: ${member.name}(${member._id}) { description: ${description}, github: ${github}, instagram: ${instagram}, blog: ${blog} }`,
    );
  }

  @OnEvent(UpdateMyPasswordEvent.EVENT_NAME)
  onUpdateMyPassword({ member }: UpdateMyPasswordEvent) {
    this.logger.log(`Update my password: ${member.name}(${member._id})`);
  }

  @OnEvent(UpdateMyAvatarEvent.EVENT_NAME)
  onUpdateMyAvatar({ member, avatar }: UpdateMyAvatarEvent) {
    this.logger.log(`Update my avatar: ${member.name}(${member._id}) { url: (${avatar}) }`);
  }

  @OnEvent(DeleteMyAvatarEvent.EVENT_NAME)
  onDeleteMyAvatar({ member }: DeleteMyAvatarEvent) {
    this.logger.log(`Delete my avatar: ${member.name}(${member._id})`);
  }
}
