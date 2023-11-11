import { I_Response } from '@app/common/models/shared/app'
import { Tag } from '@prisma/client'

export type T_CreateTagResponse = I_Response<Tag>

export type T_GetTagsResponse = I_Response<Tag[]>

export type T_GetTagResponse = I_Response<Tag>

export type T_UpdateTagResponse = I_Response<Tag>
