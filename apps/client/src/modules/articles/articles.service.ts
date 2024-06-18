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
        include: {
          tags: true,
          ArticleComment: true,
          ArticleReaction: {
            include: {
              reaction: true,
            },
          },
        },
      })
      return article
    } catch (error) {
      throw new NotFoundException('Статья не найдена')
    }
  }

  async addComment({
    id,
    authorId,
    text,
  }: {
    id: number
    authorId: number
    text: string
  }) {
    try {
      const article = await this.prisma.article.update({
        where: { id },
        data: {
          ArticleComment: {
            create: {
              votes: 0,
              text,
              authorId,
            },
          },
        },
      })
      return 'Вы успешно оставили комментарий'
    } catch (error) {
      throw new NotFoundException('Статья не найдена')
    }
  }

  async addReaction({
    id,
    articleReactionId,
    authorId,
  }: {
    id: number
    articleReactionId: number
    authorId: number
  }) {
    try {
      const isUserReacted = await this.prisma.article.findFirst({
        where: {
          AND: [
            { id },
            {
              ArticleReaction: {
                some: { authors: { some: { id: authorId } } },
              },
            },
          ],
        },
      })

      if (!isUserReacted) {
        const articleReaction = await this.prisma.articleReaction.findUnique({
          where: {
            id: articleReactionId,
          },
        })

        await this.prisma.article.update({
          where: { id: id },
          data: {
            ArticleReaction: {
              update: {
                where: { id: articleReactionId },
                data: {
                  counter: articleReaction.counter + 1,
                  authors: { connect: { id: authorId } },
                },
              },
            },
          },
        })

        return 'Вы успешно поставили реакцию'
      } else {
        return 'Вы уже поставили реакцию'
      }
    } catch (error) {
      throw new NotFoundException('Статья не найдена')
    }
  }
}
