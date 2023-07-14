import { E_SortBy } from '@app/common/models/shared/app'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsOptional } from 'class-validator'

export class GetUsersDto {
  @ApiProperty({
    required: false,
    type: 'array',
    additionalProperties: {
      type: 'object',
    },
    description: `
    Сортировка по убыванию даты создания:
    { "field": "createdAt", "order": "desc" }

    Сортировка по убыванию username и возрастанию id:
    { "field": "username", "order": "desc" }
    { "field": "id", "order": "asc" }
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
    Юзеры которые содержат web в username:
    { "field": "username", "value": "web" }
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
