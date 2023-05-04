export enum E_ServerMessageStatus {
  success = 'success',
  error = 'error',
  info = 'info',
}

export type T_ServerMessage = {
  text: string
  status: E_ServerMessageStatus
}

export interface I_Response<T, P = unknown> {
  data?: T
  info?: P
  message?: T_ServerMessage
}

export type T_Pagination = {
  total: number
}

export enum E_SortBy {
  asc = 'asc',
  desc = 'desc',
}
