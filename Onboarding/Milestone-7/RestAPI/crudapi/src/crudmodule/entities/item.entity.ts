// src/crudmodule/entities/item.entity.ts
// Mapping for class -> SQL queries
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() //surpise a SQL table
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Exclude()
  @Column({ type: 'int', default: 0 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @Expose({ name: 'ThisisEXPOSEWORKING' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  anotherCollumn?: string;
}
