import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  archived: boolean;

  // Relación Many-to-Many con Tags
  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
