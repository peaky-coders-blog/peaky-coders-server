import { ForbiddenException, Injectable } from '@nestjs/common'

import { CreateTagDto } from './dtos'
import { T_CreateTagResponse, T_GetTagsResponse } from './models'

import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { T_GetTagResponse, T_UpdateTagResponse } from './models/responses.model'
import { UpdateTagDto } from './dtos/updateTag.dto'

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<T_GetTagsResponse> {
    const tags = await this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    })

    return { data: tags }
  }

  async getOne(tagId: number): Promise<T_GetTagResponse> {
    const tag = await this.prisma.tag.findUnique({
      where: { id: tagId },
      include: {
        articles: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return { data: tag }
  }

  async createOne(dto: CreateTagDto): Promise<T_CreateTagResponse> {
    try {
      const tag = await this.prisma.tag.create({
        data: dto,
      })
      return { data: tag }
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error, status: E_ServerMessageStatus.error },
      })
    }
  }

  async deleteOne(tagId: number) {
    await this.prisma.tag.delete({ where: { id: tagId } })
  }

  async updateOne(
    tagId: number,
    dto: UpdateTagDto,
  ): Promise<T_UpdateTagResponse> {
    try {
      const tag = await this.prisma.tag.update({
        where: { id: tagId },
        data: dto,
      })

      return { data: tag }
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error, status: E_ServerMessageStatus.error },
      })
    }
  }
}
