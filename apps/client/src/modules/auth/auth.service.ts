import { Injectable } from '@nestjs/common'
import { E_UserFrom } from '@prisma/client'

import { T_GithubUser } from './models/github.model'

import { UsersService } from '@app/common/modules/users/users.service'
import { TokensService } from '@app/common/modules/tokens/tokens.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async authByThirdParty(data: T_GithubUser, from: E_UserFrom) {
    const user = await this.usersService.findUnique('email', data.email)

    // Аутентификация
    if (user) {
      return await this.tokensService.generateClientTokens({
        userId: user.id,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
      })
    }

    // Регистрация
    // Создаём пользователя
    const createdUser = await this.usersService.create({
      email: data.email,
      avatar: data.photo,
      username: data.username,
      from,
    })

    return await this.tokensService.generateClientTokens({
      userId: createdUser.id,
      email: createdUser.email,
      avatar: createdUser.avatar,
      username: createdUser.username,
    })
  }
}
