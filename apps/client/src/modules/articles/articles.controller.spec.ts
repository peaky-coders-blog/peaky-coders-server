import { Test, TestingModule } from '@nestjs/testing'

import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'

describe('ArticlesController', () => {
  let articlesController: ArticlesController
  const mockArticlesService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    })
      .overrideProvider(ArticlesService)
      .useValue(mockArticlesService)
      .compile()

    articlesController = module.get<ArticlesController>(ArticlesController)
  })

  it('should be defined', () => {
    expect(articlesController).toBeDefined()
  })
})
