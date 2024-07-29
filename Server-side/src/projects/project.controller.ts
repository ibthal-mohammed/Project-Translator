import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectService.create(createProjectDto, req);
  }

  @Get()
  findAll() {
    return this.projectService.findAllprojects();
  }

  @Get(':id')
  findOne(@Param('id') _id: ObjectId) {
    return this.projectService.findOne(_id);
  }
  @Delete(':id')
  remove(@Param('id') _id: ObjectId) {
    return this.projectService.Delete(_id);
  }
}
