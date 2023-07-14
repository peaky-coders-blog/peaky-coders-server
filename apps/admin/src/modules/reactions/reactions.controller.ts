import {
  Param,
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { ReactionsService } from './reactions.service'

@ApiBearerAuth()
@ApiTags('Reactions')
@UseGuards(AuthGuard('jwt'))
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly service: ReactionsService) {}

  @Delete(':articleReactionId/:authorId')
  @HttpCode(HttpStatus.OK)
  deleteAuthorReaction(
    @Param('articleReactionId') articleReactionId: number,
    @Param('authorId') authorId: number,
  ) {
    return this.service.deleteAuthorReaction(articleReactionId, authorId)
  }
}
