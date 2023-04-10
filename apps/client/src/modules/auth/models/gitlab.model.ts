export type T_GitlabProfile = {
  _json: {
    username: string
    email: string
    avatar_url: string
  }
}

export type T_GitlabUser = {
  username: string
  email: string
  photo: string
}

export type T_GitlabCallback = {
  user: T_GitlabUser
}
