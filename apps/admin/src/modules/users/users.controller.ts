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
  Query,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { CreateUserDto, UpdateUserDto, GetUsersDto } from './dtos'
import {
  T_GetUsersResponse,
  T_GetUserResponse,
  T_UpdateUserResponse,
  T_CreateUserResponse,
} from './models'
import { UsersService } from './users.service'

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Query() query: GetUsersDto): Promise<T_GetUsersResponse> {
    return this.service.getAll(query)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') userId: number): Promise<T_GetUserResponse> {
    return this.service.getOne(userId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() dto: CreateUserDto): Promise<T_CreateUserResponse> {
    return this.service.createOne(dto)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param('id') userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<T_UpdateUserResponse> {
    return await this.service.updateOne(dto, userId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') userId: number) {
    return this.service.deleteOne(userId)
  }
}
