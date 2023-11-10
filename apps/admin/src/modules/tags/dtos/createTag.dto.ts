import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTagDto {
  @ApiProperty({ default: 'prisma' })
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  icon: string

  @ApiProperty()
  @IsString()
  description: string
}
