import { T_AdminId } from '@app/common/models/shared/admin'

export type T_TokenData = {
  sub: T_AdminId
  email: string
}
