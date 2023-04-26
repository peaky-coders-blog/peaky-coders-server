import { Admin } from '@prisma/client'

import { I_Response } from '@app/common/models/shared/app'

export type T_AdminPreview = Pick<Admin, 'email'>

export type T_AuthResponse = I_Response<{
  accessToken?: string
  refreshToken?: string
  admin: T_AdminPreview
}>

export type T_RefreshResponse = I_Response<{
  accessToken: string
  refreshToken: string
}>
