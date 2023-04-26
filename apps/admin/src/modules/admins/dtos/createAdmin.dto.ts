import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateAdminDto {
  @ApiProperty({ default: 'test@mail.com' })
  email: string

  @ApiProperty()
  @IsString()
  password: string
}
