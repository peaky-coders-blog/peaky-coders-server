import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GithubStrategy } from './strategies/github.strategy'
import { GitlabStrategy } from './strategies/gitlab.strategy'

import { UsersService } from '@app/common/modules/users/users.service'
import { TokensService } from '@app/common/modules/tokens/tokens.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: ['github', 'gitlab'] }),
    JwtModule.register({}),
  ],
  providers: [
    GithubStrategy,
    GitlabStrategy,
    AuthService,
    UsersService,
    TokensService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
