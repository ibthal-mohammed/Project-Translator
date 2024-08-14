import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { Dictionary } from './dictionary.model';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { UpdateDictionaryDto, CreateDictionaryDto } from './dto';

@ApiTags('Dictionary')
@ApiBearerAuth()
@Controller('projects/:projectId/dictionary')
@UseGuards(AuthGuard)
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The text has been successfully Translated.',
    type: Dictionary,
  })
  @ApiBadRequestResponse({
    description: 'The user cannot add text.',
  })
  @ApiParam({
    name: 'projectId',
    type: String,
    description: 'The ID of the project',
  })
  create(
    @Body() createDictionaryDto: CreateDictionaryDto,
    @Param('projectId', IsObjectIdPipe) projectId: ObjectId,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.dictionaryService.addString(
      projectId,
      createDictionaryDto,
      userId,
    );
  }

  @Get()
  @ApiParam({
    name: 'projectId',
    type: String,
    description: 'The ID of the project',
  })
  findAll(
    @Param('projectId', IsObjectIdPipe) projectId: ObjectId,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.dictionaryService.findAll(projectId, userId);
  }

  @Get(':language')
  @ApiParam({
    name: 'projectId',
    type: String,
    description: 'The ID of the project',
  })
  @ApiParam({ name: 'language', type: String, description: 'The language' })
  findOne(
    @Param('projectId', IsObjectIdPipe) projectId: ObjectId,
    @Param('language') language: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.dictionaryService.findOne(language, projectId, userId);
  }

  @Patch(':id')
  @ApiParam({
    name: 'projectId',
    type: String,
    description: 'The ID of the project',
  })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the Text' })
  update(
    @Param('projectId', IsObjectIdPipe) projectId: ObjectId,
    @Param('id', IsObjectIdPipe) dictionaryId: ObjectId,
    @Request() req,

    @Body() updateDictionaryDto: UpdateDictionaryDto,
  ) {
    const userId = req.user.id;
    return this.dictionaryService.update(
      dictionaryId,
      updateDictionaryDto,
      userId,
      projectId,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'projectId',
    type: String,
    description: 'The ID of the project',
  })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the Text' })
  remove(
    @Param('projectId', IsObjectIdPipe) projectId: ObjectId,
    @Param('id', IsObjectIdPipe) dictionaryId: ObjectId,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.dictionaryService.remove(dictionaryId, projectId, userId);
  }
}
