import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { T_UserData } from './models/clientTokens.model'

import { T_ClientTokens } from '@app/common/models/shared/tokens'

@Injectable()
export class TokensService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async generateClientTokens({
    userId,
    email,
    avatar,
    username,
  }: T_UserData): Promise<T_ClientTokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          avatar,
          username,
        },
        {
          secret: this.config.get('CLIENT_JWT_SECRET_AT'),
          expiresIn: 120 * 60, // 10 минут
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          avatar,
          username,
        },
        {
          secret: this.config.get('CLIENT_JWT_SECRET_RT'),
          expiresIn: 60 * 60 * 24 * 7, // неделя
        },
      ),
    ])

    return {
      accessToken: at,
      refreshToken: rt,
    }
  }
}
