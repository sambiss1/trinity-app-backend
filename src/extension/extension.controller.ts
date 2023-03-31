import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';
import { Extension } from 'src/schemas/extension.schema';

@Controller("api/extensions")
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) { }

  @Post("/add")
  create(@Body() createExtensionDto: CreateExtensionDto) {
    return this.extensionService.create(createExtensionDto);
  }

  @Get("/all")
  findAll() {
    return this.extensionService.findAll();
  }
  @Get()
  findAllByCompany(@Query("company") company: string) {
    return this.extensionService.findAllByCompany(company);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extensionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() extension: Extension) {
    return this.extensionService.update(id, extension);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extensionService.remove(id);
  }

  @Delete()
  deleteAll() {
    return this.extensionService.deleteAll();
  }

}
