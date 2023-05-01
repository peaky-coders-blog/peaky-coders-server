import { Test, TestingModule } from '@nestjs/testing'
import * as argon2 from 'argon2'

import { AdminsController } from './admins.controller'
import { AdminsService } from './admins.service'

describe('ArticlesController', () => {
  let adminsController: AdminsController
  const mockAdminsService = {
    createOne: jest.fn((dto) => ({
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...dto,
    })),

    updateOne: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [AdminsService],
    })
      .overrideProvider(AdminsService)
      .useValue(mockAdminsService)
      .compile()

    adminsController = module.get<AdminsController>(AdminsController)
  })

  it('should be defined', () => {
    expect(adminsController).toBeDefined()
  })

  it('should create a admin', async () => {
    const dto = {
      email: 'test@gmail.com',
      password: '123456',
    }
    dto.password = await argon2.hash(dto.password)

    expect(
      adminsController.createOne({
        email: dto.email,
        password: dto.password,
      }),
    ).toEqual({
      id: expect.any(Number),
      email: dto.email,
      password: dto.password,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(mockAdminsService.createOne).toHaveBeenCalledWith(dto)
  })

  it('should update a admin', () => {
    const dto = {
      email: 'test@gmail.com',
    }

    expect(adminsController.updateOne('1', dto)).toEqual({
      id: 1,
      ...dto,
    })

    expect(mockAdminsService.updateOne).toHaveBeenCalled()
  })
})
