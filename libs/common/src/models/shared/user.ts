export enum E_UserFrom {
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
}

export interface I_User {
  id: number
  createdAt: Date
  username: string
  email: string
  avatar: string
  from: E_UserFrom
}
