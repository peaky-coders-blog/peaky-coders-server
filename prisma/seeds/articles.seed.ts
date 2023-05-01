import { Article, E_ArticleStatus, PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export const articlesSeed = async (user: User) => {
  const tags = await prisma.tags.findMany()
  const reactions = await prisma.reaction.findMany()
  const reactionConnections = reactions.map((reaction) => ({
    reactionId: reaction.id,
    counter: 0,
  }))

  const mockArticles: Article[] = generateArticles(100).map((data, index) => ({
    id: index,
    title: data.title,
    content: data.content,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: E_ArticleStatus.PUBLISHED,
    authorId: user.id,
  }))

  mockArticles.forEach(async (article) => {
    const [randomTagId1, randomTagId2] = getRandomIds(tags)

    // Создание статьи с двумя рандомными тегами и с реакциями
    const createdArticle = await prisma.article.create({
      data: {
        ...article,
        tags: { connect: [{ id: randomTagId1 }, { id: randomTagId2 }] },
        ArticleReaction: {
          createMany: { data: reactionConnections },
        },
      },
      include: {
        ArticleReaction: true,
      },
    })

    // Добавление реакции
    const isUserReacted = await prisma.article.findFirst({
      where: {
        AND: [
          { id: createdArticle.id },
          { ArticleReaction: { some: { authors: { some: { id: user.id } } } } },
        ],
      },
    })

    if (!isUserReacted) {
      await prisma.article.update({
        where: { id: createdArticle.id },
        data: {
          ArticleReaction: {
            update: {
              where: { id: createdArticle.ArticleReaction[0].id },
              data: {
                counter: createdArticle.ArticleReaction[0].counter + 1,
                authors: { connect: { id: user.id } },
              },
            },
          },
        },
      })
    }

    // Добавление комментариев
    const updatedArticleWithComments = await prisma.article.update({
      where: { id: createdArticle.id },
      data: {
        ArticleComment: {
          createMany: {
            data: [
              {
                authorId: user.id,
                text: 'Я НИПАНИМААЮ как работают связи, каша in my mind.',
                votes: 0,
              },
              {
                authorId: user.id,
                text: 'У МИНЯ ЧТО-ТО ПОЛУЧАЕТСЯ!',
                votes: 0,
              },
            ],
          },
        },
      },
      include: {
        ArticleComment: true,
      },
    })

    // Меняем рейтинг комментариев
    await prisma.articleComment.update({
      where: { id: updatedArticleWithComments.ArticleComment[0].id },
      data: {
        votes: updatedArticleWithComments.ArticleComment[0].votes + 1,
        articleCommentVotes: {
          create: {
            authorId: user.id,
          },
        },
      },
    })

    await prisma.articleComment.update({
      where: { id: updatedArticleWithComments.ArticleComment[1].id },
      data: {
        votes: updatedArticleWithComments.ArticleComment[1].votes - 1,
        articleCommentVotes: {
          create: {
            authorId: user.id,
          },
        },
      },
    })

    // Добавляем подкомментарии
    await prisma.articleComment.create({
      data: {
        articleId: updatedArticleWithComments.id,
        authorId: user.id,
        parentId: updatedArticleWithComments.ArticleComment[0].id,
        text: 'Держись',
        votes: 0,
      },
    })

    await prisma.articleComment.create({
      data: {
        articleId: updatedArticleWithComments.id,
        authorId: user.id,
        parentId: updatedArticleWithComments.ArticleComment[1].id,
        text: '(Нет)',
        votes: 0,
      },
    })
  })
}

const generateArticles = (
  counter: number,
): { title: string; content: string }[] => {
  const articles = []

  for (let i = 1; i <= counter; i++) {
    const articleTitle = `Article ${i}: Introduction to Programming`
    const codeSnippet = `
\`\`\`javascript
// Code snippet example
function greet(name) {
  console.log('Hello, ' + name + '!');
}
greet('Genie');
\`\`\`
`
    const articleBody = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet hendrerit rutrum. Sed eu velit commodo, sollicitudin nisl vel, accumsan lectus. Proin ut varius ligula. Quisque et libero vehicula, imperdiet sem vitae, ultrices ex. Etiam euismod tellus sed augue interdum dictum. Donec justo arcu, finibus in magna nec, luctus ullamcorper est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam tincidunt vitae purus quis interdum.
Aliquam erat volutpat. Ut eget diam ac ligula tincidunt dictum vel at nunc. Nullam malesuada semper tortor, a facilisis dolor pellentesque sit amet. Duis vitae felis fringilla, consequat libero eget, rhoncus arcu. Maecenas tincidunt elementum felis. Nunc varius leo a mi tempor blandit id et nulla. Vestibulum eget nunc pulvinar, euismod velit vitae, varius augue. Vivamus suscipit non lectus ut mollis. Aliquam sit amet mauris sed tortor posuere volutpat.
${codeSnippet}
Nullam sodales orci in purus ornare rhoncus. Suspendisse malesuada bibendum odio nec scelerisque. In porttitor vitae dui in dapibus. Sed id tristique purus. Nunc ac blandit justo, vel euismod mauris. Etiam eleifend dolor magna, in imperdiet elit pretium at. Ut eget est pretium, lacinia dolor id, consequat orci. Praesent velit nisi, consectetur in sapien et, accumsan pharetra mi. Donec feugiat lobortis tellus vel suscipit. Nam fringilla fermentum neque vel iaculis.`

    const content = `${articleTitle}\n\n${articleBody}${codeSnippet}`

    articles.push({ title: articleTitle, content })
  }

  return articles
}

// Получение случайных id тэгов для связывания со статьёй
const getRandomIds = <T extends { id: number }>(arr: T[]): number[] => {
  const randIndex1 = Math.floor(Math.random() * arr.length)
  let randIndex2 = Math.floor(Math.random() * arr.length)

  // Проверяем, чтобы индексы не были одинаковыми
  while (randIndex1 === randIndex2) {
    randIndex2 = Math.floor(Math.random() * arr.length)
  }
  return [arr[randIndex1].id, arr[randIndex2].id]
}
