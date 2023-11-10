import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tagsSeed = async () => {
  const tags = [
    {
      name: 'React',
      description: 'Библиотека от Facebook',
      icon: 'devicon-react-original',
    },
    {
      name: 'NestJS',
      description: 'Кот на логотипе',
      icon: 'devicon-nestjs-plain',
    },
    {
      name: 'Styled Components',
      description: 'CSS-in-JS',
      icon: '',
    },
    {
      name: 'Vue',
      description: 'Зелёная команда',
      icon: 'devicon-vuejs-plain',
    },
    {
      name: 'Redux',
      description: 'Model Controller для вашего приложения',
      icon: 'devicon-redux-original',
    },
  ]
  const isTagsExist = await prisma.tag.count()

  if (!isTagsExist) {
    await prisma.tag.createMany({ data: tags })
  }
}
