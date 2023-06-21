import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { TagsService } from './tags.service'
import { CreateTagDto } from './dtos'
import { T_CreateTagResponse, T_GetTagsResponse } from './models'

@ApiBearerAuth()
@ApiTags('Tags')
@UseGuards(AuthGuard('jwt'))
@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetTagsResponse> {
    return this.service.getAll()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateTagDto): Promise<T_CreateTagResponse> {
    return this.service.createOne(dto)
  }
}
