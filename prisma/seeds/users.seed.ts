import { E_UserFrom, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const usersSeed = async () => {
  return await prisma.user.create({
    data: {
      avatar: 'https://avatars.githubusercontent.com/u/35300057?v=4',
      email: 'theoriginaldeadpool@yandex.ru',
      from: E_UserFrom.GITHUB,
      username: 'YaroslavWeb',
    },
  })
}
