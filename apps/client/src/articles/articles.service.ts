import { Injectable } from '@nestjs/common'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getArticles() {
    const articles = await this.prisma.article.findMany()
    return articles
  }
}
