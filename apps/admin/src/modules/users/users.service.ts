import { ForbiddenException, Injectable } from '@nestjs/common'

import { CreateUserDto, UpdateUserDto } from './dtos'
import {
  T_GetUsersResponse,
  T_GetUserResponse,
  T_UpdateUserResponse,
  T_CreateUserResponse,
} from './models'

import { T_UserId } from '@app/common/models/shared/user'
import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<T_GetUsersResponse> {
    const users = await this.prisma.user.findMany()

    return { data: users }
  }

  async getOne(userId: T_UserId): Promise<T_GetUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    return { data: user }
  }

  async createOne(dto: CreateUserDto): Promise<T_CreateUserResponse> {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    })

    return { data: user }
  }

  async updateOne(
    dto: UpdateUserDto,
    userId: T_UserId,
  ): Promise<T_UpdateUserResponse> {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: dto,
      })

      return { data: user }
    } catch (error) {
      throw new ForbiddenException({
        message: { text: error.detail, status: E_ServerMessageStatus.error },
      })
    }
  }

  async deleteOne(userId: T_UserId) {
    await this.prisma.user.delete({ where: { id: userId } })
  }
}
