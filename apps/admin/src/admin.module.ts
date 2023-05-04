import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'
import { AdminsModule } from './modules/admins/admins.module'
import { UsersModule } from './modules/users/users.module'
import { ArticlesModule } from './modules/articles/articles.module'

import { PrismaModule } from '@app/common/modules/prisma/prisma.module'

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AdminsModule,
    UsersModule,
    ArticlesModule,
  ],
  controllers: [],
})
export class AdminModule {}
