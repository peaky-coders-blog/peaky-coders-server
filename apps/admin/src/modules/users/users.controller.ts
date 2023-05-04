import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { CreateUserDto, UpdateUserDto } from './dtos'
import {
  T_GetUsersResponse,
  T_GetUserResponse,
  T_UpdateUserResponse,
  T_CreateUserResponse,
} from './models'
import { UsersService } from './users.service'
import { T_UserId } from '@app/common/models/shared/user'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<T_GetUsersResponse> {
    return this.service.getAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: T_UserId): Promise<T_GetUserResponse> {
    return this.service.getOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateUserDto): Promise<T_CreateUserResponse> {
    return this.service.createOne(dto)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') id: T_UserId,
    @Body() dto: UpdateUserDto,
  ): Promise<T_UpdateUserResponse> {
    return await this.service.updateOne(dto, id)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: T_UserId) {
    return this.service.deleteOne(id)
  }
}
