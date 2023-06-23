import { ForbiddenException, Injectable } from '@nestjs/common'

import { T_GetArticlesResponse, T_GetArticleResponse } from './models'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { T_ArticleId } from '@app/common/models/shared/article'
import { GetArticlesDto, UpdateArticleDto } from './dtos'
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

  async getOne(articleId: T_ArticleId): Promise<T_GetArticleResponse> {
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

  // async createOne(dto: CreateUserDto): Promise<T_CreateUserResponse> {
  //   const user = await this.prisma.user.create({
  //     data: {
  //       ...dto,
  //     },
  //   })

  //   return { data: user }
  // }

  async updateOne(dto: UpdateArticleDto, articleId: T_ArticleId) {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id: Number(articleId),
        },
        include: {
          tags: true,
        },
      })
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

  async deleteOne(articleId: T_ArticleId) {
    await this.prisma.article.delete({ where: { id: articleId } })
  }
}
