import { Injectable, Delete } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project') public projectModel,
    private readonly jwtService: JwtService,
  ) {}
  async create(createProjectDto: CreateProjectDto, req: Request) {
    // console.log(req.header);
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    // console.log(decoded.id);
    const userId = decoded.id;
    let newProject = new this.projectModel(createProjectDto);
    newProject.userId = userId;
    await newProject.save();
    return { message: 'This action adds a new project', data: newProject };
  }

  async findAllprojects() {
    let project = await this.projectModel.find();
    return { message: `This action returns all project`, data: project };
  }

  async findOne(_id: ObjectId) {
    let project = await this.projectModel.findOne({
      _id,
    });
    return { message: `This action returns a #${_id} project`, data: project };
  }

  async Delete(_id: ObjectId) {
    let project = await this.projectModel.findByIdAndDelete({
      _id,
    });
    return { message: `This action removes a #${_id} project`, data: project };
  }
}
