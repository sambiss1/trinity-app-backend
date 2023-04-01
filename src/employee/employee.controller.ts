import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Request } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from 'src/schemas/employee.schema';
import { ObjectId } from 'mongoose';
@Controller("api/employees")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }


  @Get("/company/:company")
  findByCompany(@Param("company") company: string) {
    return this.employeeService.findByCompany(company)
  }

  @Get("/new/:company")
  findNewEmployees(@Param("company") company: string) {
    return this.employeeService.findNewEmployees(company)
  }
  @Get("/name/company")
  findAndSortByName(@Query("company") company: string) {
    return this.employeeService.findAndSortByName(company)
  }

  @Get("/deleted")
  findDeleted() {
    return this.employeeService.findDeleted();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }


  @Get("/extension/:extension")
  findByExtension(@Param("extension") extension: string) {
    return this.employeeService.findByExtension(extension);
  }

  @Get("/position/:position")
  findByPosition(@Param("position") id: string) {
    return this.employeeService.findByPosition(id);
  }



  // @Get("/director")
  // findDirectorByExtension(@Req() extension: string, position: string,) {
  //   return this.employeeService.findDirectorByExtension(extension, position);
  // }
  @Get("/director")
  findDirectorByExtension(@Req() req: Request, @Query("extension") extension: string, @Query("position") position: string) {
    return this.employeeService.findDirectorByExtension(extension, position);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() employee: Employee) {
    return this.employeeService.update(id, employee);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }

  @Delete()
  deleteAll() {
    return this.employeeService.deleteAll();
  }
}
