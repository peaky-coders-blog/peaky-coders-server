import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AccessTokenStrategy } from '@app/common/strategies/accessesToken.strategy'
import { RefreshTokenStrategy } from '@app/common/strategies/refreshToken.strategy'

import { TokensService } from '@app/common/modules/tokens/tokens.service'

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokensService,
  ],
})
export class AuthModule {}
