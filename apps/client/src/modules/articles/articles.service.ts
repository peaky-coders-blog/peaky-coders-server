import { Injectable, NotFoundException } from '@nestjs/common'

import { T_GetArticlesRequest, T_GetArticleRequest } from './models'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getArticles({ cursor, limit }: T_GetArticlesRequest) {
    try {
      const articles = await this.prisma.article.findMany({
        take: limit || 1,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
      })

      return articles
    } catch (error) {
      throw new NotFoundException('Статьи не найдены')
    }
  }

  async getArticle({ id }: T_GetArticleRequest) {
    try {
      const article = await this.prisma.article.findUnique({
        where: { id: +id },
      })
      return article
    } catch (error) {
      throw new NotFoundException('Статья не найдена')
    }
  }
}
