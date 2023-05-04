export type T_GetArticlesRequest = {
  page: number
  limit: number
  sort: string
  order: string
  filters: Record<string, any>
}
