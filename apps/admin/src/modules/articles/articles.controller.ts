import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { T_GetArticlesResponse, T_GetArticleResponse } from './models'
import { ArticlesService } from './articles.service'
import { GetArticlesDto } from './dtos/getArticles.dto'

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
  //   return this.service.createOne(dto)
  // }

  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // async updateOne(
  //   @Param('id') id: string,
  //   @Body() dto: UpdateUserDto,
  // ): Promise<T_UpdateUserResponse> {
  //   return await this.service.updateOne(dto, +id)
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // deleteOne(@Param('id') id: string) {
  //   return this.service.deleteOne(+id)
  // }
}
