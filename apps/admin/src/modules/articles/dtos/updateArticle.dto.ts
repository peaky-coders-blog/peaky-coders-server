import { ApiProperty } from '@nestjs/swagger'
import { E_ArticleStatus } from '@prisma/client'
import { IsEnum, IsString } from 'class-validator'

export class UpdateArticleDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({ default: E_ArticleStatus.DRAFT })
  @IsEnum(E_ArticleStatus)
  status: E_ArticleStatus

  @ApiProperty()
  tags: string[]

  @ApiProperty()
  @IsString()
  content: string
}
