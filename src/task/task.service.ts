import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Task, TaskDocument } from 'src/schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: SoftDeleteModel<TaskDocument>) { }

  // Create task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await new this.taskModel(createTaskDto).save();
    return createdTask;
  }

  // find all tasks
  async findAll() {
    return await this.taskModel.find().populate([{ path: "service" }, { path: "taskers" }, { path: "customer" }]);
  }

  // Get in progress tasks
  // find all tasks
  async findByStatus(status: number) {
    return await this.taskModel.find().populate([{ path: "service" }, { path: "taskers" }, { path: "customer" }]);
  }

  // Find customer tasks 
  async findByCustomer(customer: string) {
    return await this.taskModel.find().where({ customer }).populate([{ path: "service" }, { path: "taskers" }])
  }

  // Find one
  async findOne(id: number) {
    return await this.taskModel.findOne({ id }).populate([{ path: "service" }, { path: "taskers" }, { path: "customer" }]);
  }


  // Update one
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.updateOne({ id }, { $set: { ...updateTaskDto } });
  }

  // Delete one
  async remove(id: number) {
    const deleted = this.taskModel.softDelete({ _id: id });
    return deleted;
  }




  // remove many 
  async deleteAll() {
    return await this.taskModel.deleteMany();
  }
}
