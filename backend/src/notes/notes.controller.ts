import { Controller, Post, Get, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { ParseIntPipe } from '@nestjs/common';




@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: CreateNoteDto) {
    return this.notesService.create(body);
  }

  @Get('active')
  findAllActive() {
    return this.notesService.findAllActive();
  }

  @Get('archived')
  findAllArchived() {
    return this.notesService.findAllArchived();
  }
  @Get()
  findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Note>) {
    return this.notesService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(Number(id));
  }

  @Patch(':id/archive')
  toggleArchive(@Param('id') id: string) {
    return this.notesService.toggleArchive(Number(id));
  }
  @Patch(':id/unarchive')
  unarchiveNote(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.unarchive(id);
  }
  @Patch(':id/tags')
addTagsToNote(
  @Param('id', ParseIntPipe) id: number,
  @Body() tagNames: string[],
) {
  return this.notesService.addTagsToNote(id, tagNames);
}
@Get('by-tag/:tag')
getNotesByTag(@Param('tag') tag: string) {
  return this.notesService.getNotesByTag(tag);
}


  
}


