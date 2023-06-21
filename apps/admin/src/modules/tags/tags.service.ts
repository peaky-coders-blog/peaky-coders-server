import { ForbiddenException, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

import { CreateTagDto } from './dtos'
import { T_CreateTagResponse, T_GetTagsResponse } from './models'

import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<T_GetTagsResponse> {
    const tags = await this.prisma.tag.findMany()

    return { data: tags }
  }

  async createOne(dto: CreateTagDto): Promise<T_CreateTagResponse> {
    try {
      const tag = await this.prisma.tag.create({
        data: {
          name: dto.name,
        },
      })
      return { data: tag }
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error, status: E_ServerMessageStatus.error },
      })
    }
  }
}