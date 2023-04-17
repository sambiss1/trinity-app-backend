import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { Service } from 'src/schemas/services.schemas';
@Controller("api/services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  // Post
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  // get all
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  // Get by company
  @UseGuards(AuthGuard('jwt'))
  @Get(":company")
  findByCompany(@Param('company') company: string) {
    return this.servicesService.findByCompany(company)
  }

  // Get one
  @UseGuards(AuthGuard('jwt'))
  @Get("/single/:id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(id);
  }

  // Update one
  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit/:id')
  update(@Param('id') id: string, @Body() service: Service) {
    return this.servicesService.update(id, service);
  }

  // Delete one
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  //Delete Many  
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll() {
    return this.servicesService.deleteAll();
  }
}
