import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'
import { AdminsModule } from './modules/admins/admins.module'
import { UsersModule } from './modules/users/users.module'
import { ArticlesModule } from './modules/articles/articles.module'
import { TagsModule } from './modules/tags/tags.module'
import { CommentsModule } from './modules/comments/tags/comments.module'

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
    TagsModule,
    CommentsModule,
  ],
  controllers: [],
})
export class AdminModule {}
