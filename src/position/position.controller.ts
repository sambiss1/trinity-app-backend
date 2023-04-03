import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from 'src/schemas/position.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller("api/position")
export class PositionController {
  constructor(private readonly positionService: PositionService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.positionService.findAll();
  }


  @UseGuards(AuthGuard('jwt'))
  @Get(":company")
  findByCompany(@Param("company") company: string) {
    return this.positionService.findByCompany(company);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() position: Position) {
    return this.positionService.update(id, position);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll() {
    return this.positionService.deleteAll();
  }
}
