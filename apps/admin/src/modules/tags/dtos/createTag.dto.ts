import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateTagDto {
  @ApiProperty({ default: 'prisma' })
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  icon: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string
}
