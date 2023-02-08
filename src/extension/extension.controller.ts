import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';

@Controller('extension')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Post()
  create(@Body() createExtensionDto: CreateExtensionDto) {
    return this.extensionService.create(createExtensionDto);
  }

  @Get()
  findAll() {
    return this.extensionService.findAll();
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
}
