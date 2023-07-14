import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon2 from 'argon2'

import { SignInDto } from './dtos/signIn.dto'
import { T_AuthResponse } from './models'

import { E_ServerMessageStatus } from '@app/common/models/shared/app'
import { PrismaService } from '@app/common/modules/prisma/prisma.service'
import { TokensService } from '@app/common/modules/tokens/tokens.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
  ) {}

  async signIn(dto: SignInDto): Promise<T_AuthResponse> {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    })

    // Если пользователь не найден
    if (!admin)
      throw new UnauthorizedException({
        message: {
          text: 'Пользователь не зарегистрирован',
          status: E_ServerMessageStatus.error,
        },
      })

    const passwordMatches = await argon2.verify(admin.password, dto.password)

    // Если пароли не совпадают
    if (!passwordMatches)
      throw new UnauthorizedException({
        message: {
          text: 'Неверный пароль',
          status: E_ServerMessageStatus.error,
        },
      })

    const tokens = await this.tokensService.generateAdminTokens({
      userId: admin.id,
      email: admin.email,
    })

    return {
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        admin: {
          email: admin.email,
        },
      },
    }
  }

  async check(adminId: number): Promise<T_AuthResponse> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    })

    // Если пользователь не найден
    if (!admin) throw new UnauthorizedException()

    return {
      data: {
        admin: {
          email: admin.email,
        },
      },
    }
  }
}
