import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';
import { Extension } from 'src/schemas/extension.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller("api/extensions")
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) { }


  @UseGuards(AuthGuard('jwt'))
  @Post("/add")
  create(@Body() createExtensionDto: CreateExtensionDto) {
    return this.extensionService.create(createExtensionDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get("/all")
  findAll() {
    return this.extensionService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAllByCompany(@Query("company") company: string) {
    return this.extensionService.findAllByCompany(company);
  }



  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extensionService.findOne(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() extension: Extension) {
    return this.extensionService.update(id, extension);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extensionService.remove(id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll() {
    return this.extensionService.deleteAll();
  }

}
