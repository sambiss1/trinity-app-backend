import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from 'src/schemas/position.schema';

@Controller("api/position")
export class PositionController {
  constructor(private readonly positionService: PositionService) { }

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() position: Position) {
    return this.positionService.update(id, position);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(id);
  }
}
