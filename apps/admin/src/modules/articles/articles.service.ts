import { ForbiddenException, Injectable } from '@nestjs/common'

import { T_GetArticlesResponse, T_GetArticleResponse } from './models'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { CreateArticleDto, GetArticlesDto, UpdateArticleDto } from './dtos'
import { E_ServerMessageStatus } from '@app/common/models/shared/app'

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  async getAll({
    page,
    limit,
    sort,
    filter,
  }: GetArticlesDto): Promise<T_GetArticlesResponse> {
    const skip = (page - 1) * limit
    const orderBy = sort.reduce((acc, { field, order }) => {
      if (/[.]/.test(field)) {
        const [parentField, childField] = field.split('.')
        acc.push({
          [parentField]: {
            [childField]: order,
          },
        })
      } else {
        acc.push({
          [field]: order,
        })
      }
      return acc
    }, [])

    const where = filter.reduce((acc, { field, value }) => {
      if (/[.]/.test(field)) {
        const [parentField, childField] = field.split('.')
        return {
          ...acc,
          [parentField]: {
            [childField]: {
              contains: value,
            },
          },
        }
      } else if (field === 'status') {
        if (acc[field]?.in) {
          acc[field].in.push(value)
          return acc
        } else {
          return {
            ...acc,
            [field]: {
              in: [value],
            },
          }
        }
      } else {
        return {
          ...acc,
          [field]: {
            contains: value,
          },
        }
      }
    }, {})

    const articles = await this.prisma.article.findMany({
      skip,
      take: limit,
      orderBy,
      where,
      include: {
        author: true,
        tags: true,
        ArticleReaction: {
          include: {
            reaction: true,
          },
        },
        _count: {
          select: {
            ArticleComment: true,
          },
        },
      },
    })

    const total = await this.prisma.article.count({
      where,
    })

    return { data: articles, info: { total } }
  }

  async getOne(articleId: number): Promise<T_GetArticleResponse> {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
      include: {
        ArticleComment: {
          include: {
            author: true,
          },
        },
        ArticleReaction: {
          include: {
            reaction: true,
            authors: true,
          },
        },
        author: true,
        tags: true,
        _count: {
          select: {
            ArticleComment: true,
          },
        },
      },
    })

    return { data: article }
  }

  async createOne(dto: CreateArticleDto) {
    const reactions = await this.prisma.reaction.findMany()
    const reactionConnections = reactions.map((reaction) => ({
      reactionId: reaction.id,
      counter: 0,
    }))

    await this.prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content,
        status: dto.status,
        authorId: 1,
        views: 0,
        tags: { connect: dto.tags.map((tag) => ({ id: tag })) },
        ArticleReaction: {
          createMany: { data: reactionConnections },
        },
      },
    })
  }

  async updateOne(dto: UpdateArticleDto, articleId: number) {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id: Number(articleId),
        },
        include: {
          tags: true,
        },
      })

      // Убираем все теги, чтобы присвоить новые
      await this.prisma.article.update({
        where: {
          id: Number(articleId),
        },
        data: {
          tags: {
            disconnect: article.tags.map((tag) => ({ id: tag.id })),
          },
        },
      })
      await this.prisma.article.update({
        where: { id: articleId },
        data: {
          title: dto.title,
          content: dto.content,
          status: dto.status,
          updatedAt: new Date(),
          tags: {
            connect: dto.tags.map((tag) => ({ id: Number(tag) })),
          },
        },
      })
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error.detail, status: E_ServerMessageStatus.error },
      })
    }
  }

  async deleteOne(articleId: number) {
    await this.prisma.article.delete({ where: { id: articleId } })
  }
}
