import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tagsSeed = async () => {
  const tags = [
    {
      name: 'React',
      description: 'Библиотека от Facebook',
      icon: 'BiLogoReact',
    },
    { name: 'NestJS', description: 'Кот на логотипе', icon: 'SiNestjs' },
    {
      name: 'Styled Components',
      description: 'CSS-in-JS',
      icon: 'SiStyledcomponents',
    },
    { name: 'Vue', description: 'Зелёная команда', icon: 'FaVuejs' },
    {
      name: 'Redux',
      description: 'Model Controller для вашего приложения',
      icon: 'BiLogoRedux',
    },
  ]
  const isTagsExist = await prisma.tag.count()

  if (!isTagsExist) {
    await prisma.tag.createMany({ data: tags })
  }
}
