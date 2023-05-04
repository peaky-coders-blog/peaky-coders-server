import { Article } from '@prisma/client'

import { I_Response, T_Pagination } from '@app/common/models/shared/app'

export type T_GetArticlesResponse = I_Response<Article[], T_Pagination>

export type T_GetArticleResponse = I_Response<Article>
