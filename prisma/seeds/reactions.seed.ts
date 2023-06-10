import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const reactionsSeed = async () => {
  const reaction = [
    { name: 'Like', icon: '❤️' },
    { name: 'Surprised', icon: '😯' },
    { name: 'Cry', icon: '😢' },
    { name: 'Thoughtful', icon: '🤔' },
    { name: 'Popcorn', icon: '🍿' },
  ]

  const isReactionsExist = await prisma.reaction.count()

  if (!isReactionsExist) {
    await prisma.reaction.createMany({ data: reaction })
  }
}
