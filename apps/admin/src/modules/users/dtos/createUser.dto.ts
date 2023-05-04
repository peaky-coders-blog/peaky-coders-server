import { ApiProperty } from '@nestjs/swagger'
import { E_UserFrom } from '@prisma/client'
import { IsEmail, IsEnum, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ default: 'test@mail.com' })
  @IsEmail()
  email: string

  @ApiProperty({ default: 'Username' })
  @IsString()
  username: string

  @ApiProperty({ default: E_UserFrom.GITHUB })
  @IsEnum(E_UserFrom)
  from: E_UserFrom

  @ApiProperty({
    default: 'https://avatars.githubusercontent.com/u/35300057?v=4',
  })
  @IsString()
  avatar: string
}
