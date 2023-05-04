import { I_Response } from '@app/common/models/shared/app'
import { Admin } from '@prisma/client'

export type T_CreateAdminResponse = I_Response<Admin>

export type T_GetAdminsResponse = I_Response<Omit<Admin, 'password'>[]>

export type T_GetAdminResponse = I_Response<Omit<Admin, 'password'>>

export type T_UpdateAdminResponse = I_Response<Admin>
