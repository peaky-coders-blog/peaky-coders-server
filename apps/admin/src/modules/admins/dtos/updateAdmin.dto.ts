import { ApiProperty } from '@nestjs/swagger'

export class UpdateAdminDto {
  @ApiProperty({ default: 'test@mail.com' })
  email: string
}
