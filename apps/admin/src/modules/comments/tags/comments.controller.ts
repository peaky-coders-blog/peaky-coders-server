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

import { CommentsService } from './comments.service'

@ApiBearerAuth()
@ApiTags('Comments')
@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: number) {
    return this.service.deleteOne(id)
  }
}
