import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = ['Cat1', 'Cat2', 'Cat3'];

  findAll(): string[] {
    return this.cats;
  }

  create(catName: string): string {
    this.cats.push(catName);
    return `Cat ${catName} added successfully!`;
  }
}
