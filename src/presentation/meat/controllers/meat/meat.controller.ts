import { CreateMeatDTO, GetMeatDTO, UpdateMeatDTO } from '@application/dtos/meat';
import { IMeatService, MEAT_SERVICE } from '@application/services/meat';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Meats')
@Controller(':userId/meats')
export class MeatController {
  constructor(
    @Inject(MEAT_SERVICE) private readonly meatService: IMeatService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Returns all meats by user id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetMeatDTO,
    isArray: true,
  })
  async findAllByUserId(@Param('userId') userId: string) {
    return await this.meatService.findAllByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns meat by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetMeatDTO,
  })
  async findById(@Param('userId') userId: string, @Param('id') id: string) {
    return await this.meatService.findById(id, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new meat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetMeatDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  async store(@Param('userId') userId: string, @Body() meat: CreateMeatDTO) {
    meat.userId = userId;
    return await this.meatService.create(meat);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a meat' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetMeatDTO,
  })
  async update(@Param('userId') userId: string, @Param('id') id: string, @Body() meat: UpdateMeatDTO) {
    meat.userId = userId;
    return await this.meatService.update(id, meat);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a meat' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('userId') userId: string, @Param('id') id: string) {
    return await this.meatService.delete(id, userId);
  }
}
