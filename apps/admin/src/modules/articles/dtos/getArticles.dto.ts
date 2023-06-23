import { E_SortBy } from '@app/common/models/shared/app'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsOptional } from 'class-validator'

export class GetArticlesDto {
  @ApiProperty({ required: false, type: 'number', default: 1 })
  @IsOptional()
  @Transform((obj) => Number(obj.value))
  page = 1

  @ApiProperty({ required: false, type: 'number', default: 10 })
  @IsOptional()
  @Transform((obj) => Number(obj.value))
  limit = 10

  @ApiProperty({
    required: false,
    type: 'array',
    additionalProperties: {
      type: 'object',
    },
    description: `
    Сортировка по убыванию даты создания:
    { "field": "createdAt", "order": "desc" }

    Сортировка по убыванию title и возрастанию id:
    { "field": "title", "order": "desc" }
    { "field": "id", "order": "asc" }

    Сортировка по убыванию author и id:
    { "field": "author.username", "order": "desc" }
    { "field": "id", "order": "desc" }
    `,
  })
  @Transform((obj) => {
    if (Array.isArray(obj.value)) {
      return obj.value.map((value) => JSON.parse(value))
    }
    return [JSON.parse(obj.value)]
  })
  @IsArray()
  @IsOptional()
  sort: { field: string; order: E_SortBy }[] = []

  @ApiProperty({
    required: false,
    type: 'array',
    additionalProperties: {
      type: 'object',
    },
    description: `
    Статьи которые содержат цифру 9 в title:
    { "field": "title", "value": "9" }

    Статьи которые содержат цифру 1 в title и имя автора содержит Web:
    { "field": "title", "value": "1" }
    { "field": "author.username", "value": "Web" }
    `,
  })
  @Transform((obj) => {
    if (Array.isArray(obj.value)) {
      return obj.value.map((value) => JSON.parse(value))
    }
    return [JSON.parse(obj.value)]
  })
  @IsOptional()
  filter: { field: string; value: string }[] = []
}
