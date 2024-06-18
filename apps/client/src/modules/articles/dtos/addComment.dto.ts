import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class AddCommentDto {
  @ApiProperty()
  @IsNumber()
  authorId: number

  @ApiProperty()
  @IsString()
  text: string
}
