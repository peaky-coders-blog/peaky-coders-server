import { Controller, Get, Param, Query } from '@nestjs/common'
import { Article } from '@prisma/client'

import { ArticlesService } from './articles.service'
import { T_GetArticles } from './models'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(@Query() query: T_GetArticles): Promise<Article[]> {
    return this.articlesService.getArticles(query)
  }

  @Get(':id')
  getArticle(@Param('id') id: string): Promise<Article> {
    return this.articlesService.getArticle({ id })
  }
}
