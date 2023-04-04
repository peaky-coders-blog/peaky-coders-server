export type T_GithubProfile = {
  username: string
  emails: { value: string }[]
  photos: { value: string }[]
}

export type T_GithubUser = {
  username: string
  email: string
  photo: string
}

export type T_GithubCallback = {
  user: T_GithubUser
}
