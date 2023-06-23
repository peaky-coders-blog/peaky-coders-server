import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Body,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { T_GetArticlesResponse, T_GetArticleResponse } from './models'
import { ArticlesService } from './articles.service'
import { UpdateArticleDto, GetArticlesDto } from './dtos'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @ApiOperation({ summary: 'Find all articles' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Query() query: GetArticlesDto): Promise<T_GetArticlesResponse> {
    return this.articleService.getAll(query)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: number): Promise<T_GetArticleResponse> {
    return this.articleService.getOne(id)
  }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createOne(@Body() dto: CreateUserDto): Promise<T_CreateUserResponse> {
  //   return this.service.createOne(dto) 1 2 308 209
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(@Param('id') id: number, @Body() dto: UpdateArticleDto) {
    return this.articleService.updateOne(dto, id)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: number) {
    return this.articleService.deleteOne(id)
  }
}
