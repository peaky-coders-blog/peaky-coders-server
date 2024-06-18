import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common'
import { Article } from '@prisma/client'

import { ArticlesService } from './articles.service'
import { AddCommentDto } from './dtos/addComment.dto'
import { AddReactionDto } from './dtos/addReaction.dto copy'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(
    @Query('cursor') cursor: number,
    @Query('limit') limit: number,
  ): Promise<Article[]> {
    return this.articlesService.getArticles({ cursor: +cursor, limit: +limit })
  }

  @Get(':id')
  getArticle(@Param('id') id: string): Promise<Article> {
    return this.articlesService.getArticle({ id })
  }

  @Put(':id/comment')
  addComment(
    @Param('id') id: string,
    @Body() dto: AddCommentDto,
  ): Promise<string> {
    return this.articlesService.addComment({ id: +id, ...dto })
  }

  @Put(':id/reaction')
  addReaction(
    @Param('id') id: string,
    @Body() dto: AddReactionDto,
  ): Promise<string> {
    return this.articlesService.addReaction({ id: +id, ...dto })
  }
}
