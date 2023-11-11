import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { TagsService } from './tags.service'
import { CreateTagDto } from './dtos'
import { T_CreateTagResponse, T_GetTagsResponse } from './models'
import { T_GetTagResponse } from './models/responses.model'
import { UpdateTagDto } from './dtos/updateTag.dto'

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<T_GetTagResponse> {
    return this.service.getOne(+id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateTagDto): Promise<T_CreateTagResponse> {
    return this.service.createOne(dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: number) {
    return this.service.deleteOne(id)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(@Param('id') id: number, @Body() dto: UpdateTagDto) {
    return this.service.updateOne(id, dto)
  }
}
