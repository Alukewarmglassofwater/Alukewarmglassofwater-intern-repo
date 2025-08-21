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
import { encryptionTransformer } from '../DB/dbencryption';

@Entity() //surpise a SQL table
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  // <-- THIS WAS MISSING: you had the decorator but no property line
  @Column({
    type: 'text',
    nullable: true,
    transformer: {
      to: (v?: string | null) => (v == null ? v : encryptionTransformer.to(v)), // encrypt on save if present
      from: (v?: string | null) => {
        if (v == null) return v; // allow NULL
        try {
          return encryptionTransformer.from(v); // decrypt if it's ciphertext
        } catch {
          return v; // fallback: it was plaintext
        }
      },
    },
  })
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
