import { Injectable, Delete } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Project } from './project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project') public projectModel: Model<Project>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createProjectDto: CreateProjectDto, id: any) {
    let newProject = new this.projectModel(createProjectDto);
    newProject.userId = id;
    await newProject.save();
    return { data: newProject };
  }

  async findAllprojects(id) {
    let project = await this.projectModel.find({ userId: id });
    return project;
  }

  async findOne(_id: ObjectId, id: any) {
    let project = await this.projectModel.findOne({
      _id,
      userId: id,
    });
    return project;
  }

  async Delete(_id: ObjectId, id: any) {
    let project = await this.projectModel.findByIdAndDelete({
      _id,
      userId: id,
    });
  }
}
