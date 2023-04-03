import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Request, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from 'src/schemas/employee.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller("api/employees")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }


  @UseGuards(AuthGuard('jwt'))
  @Get("/company/:company")
  findByCompany(@Param("company") company: string) {
    return this.employeeService.findByCompany(company)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/new/:company")
  findNewEmployees(@Param("company") company: string) {
    return this.employeeService.findNewEmployees(company)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/new/count/:company")
  countNewEmployees(@Param("company") company: string) {
    return this.employeeService.countNewEmployees(company)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/name/company")
  findAndSortByName(@Query("company") company: string) {
    return this.employeeService.findAndSortByName(company)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/deleted")
  findDeleted() {
    return this.employeeService.findDeleted();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/extension/:extension")
  findByExtension(@Param("extension") extension: string) {
    return this.employeeService.findByExtension(extension);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/position/:position")
  findByPosition(@Param("position") id: string) {
    return this.employeeService.findByPosition(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("/director")
  findDirectorByExtension(@Req() req: Request, @Query("extension") extension: string, @Query("position") position: string) {
    return this.employeeService.findDirectorByExtension(extension, position);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() employee: Employee) {
    return this.employeeService.update(id, employee);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll() {
    return this.employeeService.deleteAll();
  }
}
