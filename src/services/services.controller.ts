import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller("api/services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  // Post
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  // get all
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  // Get by company
  @Get(":company")
  findByCompany(@Param('company') company: string) {
    return this.servicesService.findByCompany(company)
  }

  // Get one
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  // Update one
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  // Delete one
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }

  //Delete Many  
  @Delete()
  deleteAll() {
    return this.servicesService.deleteAll();
  }
}
