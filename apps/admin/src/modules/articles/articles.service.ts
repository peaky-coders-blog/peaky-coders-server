import { Injectable } from '@nestjs/common'

import { T_GetArticlesResponse, T_GetArticleResponse } from './models'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { T_ArticleId } from '@app/common/models/shared/article'
import { GetArticlesDto } from './dtos/getArticles.dto'

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
      } else {
        return {
          ...acc,
          [field]: {
            contains: value,
          },
        }
      }
    }, {})

    // try {
    const articles = await this.prisma.article.findMany({
      skip,
      take: limit,
      orderBy,
      where,
      include: {
        author: true,
      },
    })

    const total = await this.prisma.article.count({
      where,
    })

    return { data: articles, info: { total } }
    // } catch (error) {
    //   if (error instanceof PrismaClientValidationError) {
    //     throw new ForbiddenException({
    //       message: {
    //         text: 'Ошибка бд',
    //         status: E_ServerMessageStatus.error,
    //       },
    //     })
    //   }
    //   throw new ForbiddenException({
    //     message: { text: error.message, status: E_ServerMessageStatus.error },
    //   })
    // }
  }

  async getOne(articleId: T_ArticleId): Promise<T_GetArticleResponse> {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
      include: {
        ArticleComment: true,
        ArticleReaction: true,
        author: true,
        tags: true,
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

  // async updateOne(
  //   dto: UpdateUserDto,
  //   userId: T_UserId,
  // ): Promise<T_UpdateUserResponse> {
  //   try {
  //     const user = await this.prisma.user.update({
  //       where: { id: userId },
  //       data: dto,
  //     })

  //     return { data: user }
  //   } catch (error) {
  //     throw new ForbiddenException({
  //       message: { text: error.detail, status: E_ServerMessageStatus.error },
  //     })
  //   }
  // }

  // async deleteOne(userId: T_UserId) {
  //   await this.prisma.user.delete({ where: { id: userId } })
  // }
}
