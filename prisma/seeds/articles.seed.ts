import { Article, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const articlesSeed = async () => {
  const mockArticles: Article[] = [...Array(100)].map((_, index) => ({
    id: index,
    title: `Some title #${index}`,
    content: 'Some text for article',
    createdAt: new Date(),
  }))

  await prisma.article.createMany({ data: mockArticles })
}
