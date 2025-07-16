import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { Tag } from './tag.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(noteData: CreateNoteDto): Promise<Note> {
    const { title, content, tags = [] } = noteData;

    const tagEntities = await Promise.all(
      tags.map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagRepository.create({ name });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    const note = this.noteRepository.create({
      title,
      content,
      tags: tagEntities,
    });

    return this.noteRepository.save(note);
  }

  async findAllActive() {
    return this.noteRepository.find({
      where: { archived: false },
      relations: ['tags'],
    });
  }

  async findAllArchived() {
    return this.noteRepository.find({
      where: { archived: true },
      relations: ['tags'],
    });
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find({ relations: ['tags'] });
  }

  async update(id: number, updateData: Partial<Note>) {
    const note = await this.noteRepository.preload({ id, ...updateData });
    if (!note) throw new NotFoundException(`Note #${id} not found`);
    return this.noteRepository.save(note);
  }

  async delete(id: number) {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Note #${id} not found`);
    return { deleted: true };
  }

  async toggleArchive(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException(`Note #${id} not found`);
    note.archived = !note.archived;
    return this.noteRepository.save(note);
  }

  async unarchive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) throw new NotFoundException('Note not found');
    note.archived = false;
    return this.noteRepository.save(note);
  }

  async addTagsToNote(noteId: number, tagNames: string[]): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['tags'],
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    const tags = await Promise.all(
      tagNames.map(async (name) => {
        let tag = await this.tagRepository.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagRepository.create({ name });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    const existingTagNames = new Set(note.tags.map((t) => t.name));
    const newTags = tags.filter((tag) => !existingTagNames.has(tag.name));

    note.tags = [...note.tags, ...newTags];
    return this.noteRepository.save(note);
  }
  async getNotesByTag(tagName: string): Promise<Note[]> {
    return this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.tags', 'tag')
      .where('tag.name = :tagName', { tagName })
      .getMany();
  }
  
}
