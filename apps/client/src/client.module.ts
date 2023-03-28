import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from '@app/common/modules/prisma/prisma.module'

import { ArticlesModule } from './articles/articles.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ArticlesModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
})
export class ClientModule {}
