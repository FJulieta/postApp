import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { Tag } from './tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag])], 
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
