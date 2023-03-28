import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { GithubStrategy } from './strategies/github.strategy'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'github' }),
  ],
  providers: [GithubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
