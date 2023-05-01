import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tagsSeed = async () => {
  const tags = [
    { name: 'React', description: 'Библиотека от Facebook', icon: 'react' },
    { name: 'NestJS', description: 'Кот на логотипе', icon: 'nestjs' },
    { name: 'Styled Components', description: 'CSS-in-JS', icon: 'sc' },
    { name: 'Vue', description: 'Зелёная команда', icon: 'vue' },
    {
      name: 'Redux',
      description: 'Model Controller для вашего приложения',
      icon: 'redux',
    },
  ]
  const isTagsExist = await prisma.tags.count()

  if (!isTagsExist) {
    await prisma.tags.createMany({ data: tags })
  }
}
