import { User } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { T_CreateUser } from './models/createUser.model'

import { PrismaService } from '@app/common/modules/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ email, username, avatar, from }: T_CreateUser): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email,
        username,
        avatar,
        from,
      },
    })
  }

  async findUnique(name: 'email', param: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { [name]: param },
    })
  }
}
