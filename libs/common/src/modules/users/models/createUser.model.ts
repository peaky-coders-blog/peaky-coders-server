import { UserFrom } from '@prisma/client'

export type T_CreateUser = {
  email: string
  username: string
  avatar: string
  from: UserFrom
}
