import { ApiProperty } from '@nestjs/swagger'
import { E_ArticleStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty({ default: E_ArticleStatus.DRAFT })
  @IsEnum(E_ArticleStatus)
  status: E_ArticleStatus

  @ApiProperty()
  tags: number[]

  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty()
  @IsNumber()
  authorId: number
}
