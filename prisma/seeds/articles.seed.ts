import { Article, E_ArticleStatus, PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export const articlesSeed = async (user: User) => {
  const mockArticles: Article[] = generateArticles(100).map((data, index) => ({
    id: index,
    title: data.title,
    content: data.content,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: E_ArticleStatus.PUBLISHED,
    authorId: user.id,
  }))

  await prisma.article.createMany({ data: mockArticles })
}

function generateArticles(
  counter: number,
): { title: string; content: string }[] {
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
