export enum E_ServerMessageStatus {
  success = 'success',
  error = 'error',
  info = 'info',
}

export type T_ServerMessage = {
  text: string
  status: E_ServerMessageStatus
}

export interface I_Response<T> {
  data?: T
  message?: T_ServerMessage
}
