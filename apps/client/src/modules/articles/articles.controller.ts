import { Controller, Get, Param, Query } from '@nestjs/common'
import { Article } from '@prisma/client'

import { ArticlesService } from './articles.service'

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
}
