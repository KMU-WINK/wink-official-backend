import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SocialService } from '@wink/activity/service';

@Controller('/activity/social')
@ApiTags('Activity [친목]')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}
}
