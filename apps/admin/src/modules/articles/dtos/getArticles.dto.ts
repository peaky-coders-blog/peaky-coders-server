import { E_SortBy } from '@app/common/models/shared/app'
import { ApiProperty } from '@nestjs/swagger'
import { Article } from '@prisma/client'
import { Transform } from 'class-transformer'
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

const articleKeys: (keyof Article)[] = ['id', 'title', 'createdAt', 'updatedAt']

export class GetArticlesDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Transform((obj) => Number(obj.value) || 1)
  @IsNumber()
  page = 1

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Transform((obj) => Number(obj.value) || 10)
  @IsNumber()
  limit = 10

  @ApiProperty({ required: false, default: 'createdAt', enum: articleKeys })
  @IsString()
  @IsOptional()
  sort = 'createdAt'

  @ApiProperty({ required: false, default: E_SortBy.desc, enum: E_SortBy })
  @IsEnum(E_SortBy)
  @IsOptional()
  order: E_SortBy = E_SortBy.desc

  @ApiProperty({
    required: false,
    type: 'object',
    default: {},
    description:
      'Если нужны статьи с заголовком у которого есть цифра 9: {"title": "9"}',
  })
  @IsObject()
  @IsOptional()
  filters: Record<string, any> = {}
}
