import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class AddReactionDto {
  @ApiProperty()
  @IsNumber()
  articleReactionId: number

  @ApiProperty()
  @IsNumber()
  authorId: number
}
