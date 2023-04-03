import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';


@Controller("api/tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.taskService.findAll();
  }


  @UseGuards(AuthGuard('jwt'))
  @Get(":customer")
  findByCustomer(@Param("customer") customer: string) {
    return this.taskService.findByCustomer(customer);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.taskService.findOne(_id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() task: Task) {
    return this.taskService.update(id, task);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll() {
    return this.taskService.deleteAll();
  }
}
