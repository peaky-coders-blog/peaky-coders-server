import { ForbiddenException, Injectable } from '@nestjs/common'

import { CreateUserDto, GetUsersDto, UpdateUserDto } from './dtos'
import {
  T_GetUsersResponse,
  T_GetUserResponse,
  T_UpdateUserResponse,
  T_CreateUserResponse,
} from './models'

import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll({ filter, sort }: GetUsersDto): Promise<T_GetUsersResponse> {
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
      } else if (field === 'from') {
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

    const users = await this.prisma.user.findMany({
      where,
      orderBy,
    })

    return { data: users }
  }

  async getOne(userId: number): Promise<T_GetUserResponse> {
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
    userId: number,
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

  async deleteOne(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } })
  }
}
