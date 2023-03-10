import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';

@Controller("api/extensions")
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) { }

  @Post("/add")
  create(@Body() createExtensionDto: CreateExtensionDto) {
    return this.extensionService.create(createExtensionDto);
  }

  @Get()
  findAll(@Query("company") company: string) {
    return this.extensionService.findAll(company);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extensionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExtensionDto: UpdateExtensionDto) {
    return this.extensionService.update(+id, updateExtensionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extensionService.remove(+id);
  }

  @Delete()
  deleteAll() {
    return this.extensionService.deleteAll();
  }

  // remove(@Param('id') id: string) {
  //   return this.extensionService.remove(+id);
  // }
}
