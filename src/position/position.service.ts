import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import {
  Position, PositionDocument
} from 'src/schemas/position.schema';

@Injectable()
export class PositionService {
  constructor(@InjectModel(Position.name) private positionModel: SoftDeleteModel<PositionDocument>) { }

  // Creat employee
  async create(createEmployeeDto: CreatePositionDto): Promise<Position> {
    const createdPosition = await new this.positionModel(createEmployeeDto).save();
    return createdPosition
  }

  // Find all 
  async findAll() {
    return this.positionModel.find()
  }

  // Find all by company
  async findByCompany(company: string) {
    return this.positionModel.find().where({ company })
  }

  // Find one
  async findOne(id: string): Promise<Position> {
    return await this.positionModel.findById(id)
  }

  async update(id: string, Position: Position): Promise<Position> {
    return await this.positionModel.findByIdAndUpdate(id, Position, { new: true })
  }
  
  // Remove one employee
  async remove(id: string) {
    const deleted = this.positionModel.softDelete({ _id: id });
    return deleted;
  }

  async findDeleted() {
    return await this.positionModel.find({ isDeleted: true })
  }

  // Remove many
  async deleteAll() {
    return this.positionModel.deleteMany();
  }
}
